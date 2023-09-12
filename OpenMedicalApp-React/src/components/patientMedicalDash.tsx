import { useState } from 'react';

const PatientMedicalDocuments = () => {
  const [documents, setDocuments] = useState([
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
      description: 'Prescribed medications for your condition.',
    },
  ]);

  return (
    <div className="container">
      <h1 className="my-4">Medical Documents</h1>
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
          {documents.map((doc) => (
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
    </div>
  );
};

export default PatientMedicalDocuments;
