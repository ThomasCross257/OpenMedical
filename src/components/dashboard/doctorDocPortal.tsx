import React, { useState, useEffect } from 'react';
import DocumentUpload from "../uploadDoc.tsx";
import { getUserInfoFromToken } from '../../assets/func/userFunc.ts';
import { fetchFromAPI } from '../../assets/func/userFunc.ts';
import { Spinner } from 'react-bootstrap';

const DoctorMedicalDocuments = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true); // New state for loading

  const info = getUserInfoFromToken();
  const role = info?.role;
  const ID = info?.ID;

  // For getPatients useEffect
  useEffect(() => {
    const getPatients = async () => {
      try {
        const response = await fetchFromAPI(`/Doctors/getPatients/${ID}/${role}`);
        const patientsFromServer = response.data;
        setPatients(patientsFromServer);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error('Error fetching patients:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    getPatients();
  }, [ID, role]);

  useEffect(() => {
    if (selectedPatient) {
      const getDocuments = async () => {
        try {
          const response = await fetchFromAPI(`/Doctors/getPatientDocs/${selectedPatient.patientID}/${ID}/${role}`);
          const docsFromServer = response.data;
          setDocuments(docsFromServer);
        } catch (error) {
          console.error('Error fetching documents:', error);
        }
      };

      getDocuments();
    }
  }, [selectedPatient, ID, role]);

  function viewDoc(link: string) {
    window.open(link);
  }

  return (
    <div className="container">
      <h1 className="my-4">Medical Documents</h1>
      {loading ? ( // Display spinner while loading
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          {selectedPatient ? (
            <>
              <button className="btn-primary btn" onClick={() => setSelectedPatient(null)}>Back</button>
              <table className="table table-striped">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Date</th>
                      <th>Patient</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documents.map((doc) => (
                      <tr key={doc.recordID}>
                        <td>{doc.title}</td>
                        <td>{new Date(doc.recordDate).toLocaleDateString()}</td>
                        <td>{doc.patientFName}</td>
                        <td>
                          <a href={doc.recordLink} download={doc.title}><button className="btn btn-primary btn-sm">Download</button></a>
                          <button className="btn btn-secondary btn-sm" onClick={() => viewDoc(doc.recordLink)}>View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </table>
              {role === 'Doctor' ? (
                <DocumentUpload selectedPatientID={selectedPatient.patientID} selectedPatientName={selectedPatient.patientFName} />
              ) : (
                <DocumentUpload />
              )}
            </>
          ) : (
            <ul style={{ listStyleType: 'none' }}>
              {patients.map((patient) => (
                <li key={patient.patientID}>
                  <button
                    style={{ width: '100%', height: '50px', textAlign: 'left' }}
                    className="btn btn-success" onClick={() => setSelectedPatient(patient)}>{patient.patientFName}</button>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default DoctorMedicalDocuments;
