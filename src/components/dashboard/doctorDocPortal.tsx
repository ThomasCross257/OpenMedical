import { useState } from 'react';
import DocumentUpload from '../uploadDoc';

const DoctorMedicalDocuments = () => {
  const [patients, setPatients] = useState([
    {
      id: 1,
      name: 'John Doe',
      lastVisit: '2023-08-05',
      documents: [
        {
          id: 1,
          name: 'Lab Report 1',
          date: '2023-08-15',
          type: 'Lab Report',
          description: 'Results from recent lab tests.',
        },
        {
          id: 2,
          name: 'Prescription',
          date: '2023-08-10',
          type: 'Prescription',
          description: 'Prescribed medications for the patient.',
        },
      ],
    },
  ]);

  const [documents, uploadDocuments] = useState(false);
// Will add these as structures to the database later.

  return (
    <div className="container">
      <h1 className="my-4">Medical Documents for Doctors</h1>
      {patients.map((patient) => (
        <div key={patient.id} className="mb-4">
          <h3>{patient.name}</h3>
          <p>Last Visit: {patient.lastVisit}</p>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Document Name</th>
                <th>Date</th>
                <th>Type</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patient.documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.name}</td>
                  <td>{doc.date}</td>
                  <td>{doc.type}</td>
                  <td>{doc.description}</td>
                  <td>
                    <button className="btn btn-primary btn-sm">View</button>
                    <button className="btn btn-secondary btn-sm">Download</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary"
          onClick={() => uploadDocuments(true)}
          >Add Document</button>
          <button className="btn btn-info">View All Records</button>
          {documents ? <DocumentUpload /> : null}
        </div>
      ))}
    </div>
  );
};

export default DoctorMedicalDocuments;
