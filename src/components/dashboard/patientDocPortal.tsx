import React, { useState, useEffect } from 'react';
import DocumentUpload from "../uploadDoc.tsx";
import { getUserInfoFromToken } from '../../assets/func/userFunc.ts';
import { fetchFromAPI } from '../../assets/func/userFunc.ts';
import { Spinner } from 'react-bootstrap';

const PatientMedicalDocuments = () => {
  const [documents, setDocuments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

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
                  <td>{doc.doctorFName}</td>
                  <td>
                    <a href={doc.recordLink} download={doc.title}><button className="btn btn-primary btn-sm">Download</button></a>
                    <button className="btn btn-secondary btn-sm" onClick={() => viewDoc(doc.recordLink)}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <DocumentUpload />
        </>
      )}
    </div>
  );
};

export default PatientMedicalDocuments;
