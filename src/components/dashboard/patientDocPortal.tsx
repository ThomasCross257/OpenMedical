import React, { useState, useEffect } from 'react';
import DocumentUpload from "../uploadDoc.tsx";
import { getUserInfoFromToken } from '../../assets/func/userFunc.ts';
import { fetchFromAPI } from '../../assets/func/userFunc.ts';
import { Spinner } from 'react-bootstrap';
import axios from 'axios';

const PatientMedicalDocuments = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingDocument, setEditingDocument] = useState(null);

  const info = getUserInfoFromToken();
  const role = info?.role;
  const ID = info?.ID;

  useEffect(() => {
    const getDocuments = async () => {
      try {
        const response = await fetchFromAPI(`/Records/getRecords/${ID}/${role}`);
        const docsFromServer = response.data;
        setDocuments(docsFromServer);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching documents:', error);
        setLoading(false);
      }
    };

    getDocuments();
  }, [ID, role]);

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
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100px' }}>
          <Spinner animation="border" role="status" />
        </div>
      ) : (
        <>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>Doctor</th>
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
          <DocumentUpload
            selectedPatientID={ID}
            selectedPatientName={info?.name}
            type="Create" />
        </>
      )}
    </div>
  );
};

export default PatientMedicalDocuments;
