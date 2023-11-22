import React, { useState, useEffect } from 'react';
import DocumentUpload from "../uploadDoc.tsx";
import { getUserInfoFromToken } from '../../assets/func/userFunc.ts';
import { fetchFromAPI } from '../../assets/func/userFunc.ts';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const DoctorMedicalDocuments = () => {
  const [patients, setPatients] = useState<any[]>([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDocument, setEditingDocument] = useState(null);

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

  const deleteDoc = async (recordID: number) => {
    try {
      if (window.confirm('Are you sure you want to delete this document?')) {
        console.log(recordID)
        await axios.post(`https://localhost:7160/api/Records/deleteRecord/${recordID}`).then((response) => {
          console.log(response.data);
          window.alert('Document deleted');
          window.location.reload();
        });
      }
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
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
                          <a href={doc.recordLink} download={doc.title}>
                            <button className="btn btn-primary btn-sm">Download</button>
                          </a>
                          <button className="btn btn-secondary btn-sm" onClick={() => viewDoc(doc.recordLink)}>
                            View
                          </button>
                          <button
                            className="btn btn-warning btn-sm"
                            onClick={() => setEditingDocument(doc)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteDoc(doc.recordID)}
                          >Delete</button>
                        </td>
                        {editingDocument?.recordID === doc.recordID && (
                          <td>
                            <div className="card card-body">
                              <DocumentUpload type="Update"
                                originalLink={doc.recordLink}
                                recordID={doc.recordID}
                                selectedPatientID={doc.patientID}
                                originalTitle={doc.title}
                                selectedPatientName={doc.patientFName} />
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}

                  </tbody>
                </table>
              </table>
              {role === 'Doctor' && !editingDocument ? (
                <DocumentUpload
                  selectedPatientID={selectedPatient.patientID}
                  selectedPatientName={selectedPatient.patientFName}
                  type="Create" />
              ) : null}

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
