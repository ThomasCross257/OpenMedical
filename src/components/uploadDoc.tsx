import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserInfoFromToken, fetchFromAPI } from '../assets/func/userFunc.ts';

const DocumentUpload: React.FC = (props) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [primaryDoctor, setPrimaryDoctor] = useState<any[]>([]);
  const [title, setTitle] = useState<string>('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const info = getUserInfoFromToken();
  const role = info?.role;
  const userName = info?.name;
  const ID = info?.ID;

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  }
  useEffect(() => {
    const getPrimaryDoctor = async () => {
      try {
        if (role === 'Patient') {
          const response = await fetchFromAPI(`/Patients/getPrimaryDoctor/${ID}/${role}`);
          const primaryDoctor = response.data;
          setPrimaryDoctor(primaryDoctor);
        }
      } catch (error) {
        console.error('Error fetching primary doctor:', error);
      }
    };
    getPrimaryDoctor();
  }, [ID, role, setPrimaryDoctor]);

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      axios.post('https://localhost:7160/api/Records/uploadRecord', formData)
        .then((uploadResponse) => {
          console.log('File uploaded successfully:', uploadResponse.data);
          const recordData = {
            patientID: role === 'Patient' ? ID : props.selectedPatientID,
            doctorID: role === 'Doctor' ? ID : primaryDoctor[0]?.doctorID,
            recordDate: new Date(),
            title: title,
            patientFName: role === 'Patient' ? userName : props.selectedPatientName,
            doctorFName: role === 'Doctor' ? userName : primaryDoctor[0]?.doctorFName,
            recordLink: "../../OpenMedical-ASP/uploads/" + uploadResponse.data,
          };
          console.log(recordData)
          return axios.post('https://localhost:7160/api/Records/storeRecord', recordData);
        })
        .then((storeResponse) => {
          console.log('Record stored successfully:', storeResponse.data);
          alert('File uploaded successfully!');
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      alert('Please select a file to upload.');
    }
  };


  return (
    <div className="container">
      <h5>Upload Documents</h5>
      <form onSubmit={handleUpload}>
        <input type="text" onChange={handleTitleChange} className="form-control" placeholder="Title" required />
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">Select a file to upload:</label>
          <input type="file" className="form-control" id="fileInput" onChange={handleFileChange} accept=".pdf" required />
        </div>
        <button type="submit" className="btn btn-primary">Upload</button>
      </form>
    </div>
  );
};

export default DocumentUpload;
