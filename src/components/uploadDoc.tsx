// @ts-nocheck
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

  // Delay for async functions
  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  const handleUpload = () => {
    event?.preventDefault(); // Prevent page refresh on submit
    if (selectedFile) {
      uploadFile()
        .then((uploadResponse) => {
          const recordData = prepareRecordData(uploadResponse);
          return axios.post('https://localhost:7160/api/Records/storeRecord', recordData);
        })
        .then((storeResponse) => {
          // console.log('Record stored successfully:', storeResponse.data);
          alert('File uploaded successfully!');
          window.location.reload();
        })
        .catch((error) => {
          console.error('Error:', error);
          window.location.reload();
        });
    } else {
      alert('Please select a file to upload.');
    }
  };

  const handleUpdate = () => {
    event?.preventDefault();
    if (selectedFile) {
      uploadFile()
        .then((fileLink) => {
          const recordData = prepareRecordData(fileLink);
          return delay(10000).then(() => updateRecord(recordData));
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          return Promise.reject(error);
        });
    } else {
      const recordData = prepareRecordData(props.originalLink);
      // console.log(recordData);
      return updateRecord(recordData);
    }
  };

  const uploadFile = () => {
    if (!selectedFile) {
      console.error('No file selected');
      return Promise.reject(new Error('No file selected'));
    }

    // Validate the file

    const formData = new FormData();
    formData.append('file', selectedFile);

    return axios.post('https://localhost:7160/api/Records/uploadRecord', formData, {
      onUploadProgress: (progressEvent) => {
        // console.log(`Upload progress: ${Math.round((progressEvent.loaded / progressEvent.total) * 100)}%`);
      },
    })
      .then((uploadResponse) => {
        // console.log('File uploaded successfully:', uploadResponse.data);
        return "/OpenMedical-ASP/uploads/" + uploadResponse.data; // Return the file link
      })
      .catch((error) => {
        console.error('Error uploading file:', error);
        return Promise.reject(error);
      });
  };

  const prepareRecordData = (fileLink) => {
    const recordData = {
      recordID: props.recordID ? props.recordID : 0,
      patientID: role === 'Patient' ? ID : props.selectedPatientID,
      doctorID: role === 'Doctor' ? ID : primaryDoctor[0]?.doctorID,
      recordDate: new Date(),
      title: title ? title : props.originalTitle,
      patientFName: role === 'Patient' ? userName : props.selectedPatientName,
      doctorFName: role === 'Doctor' ? userName : primaryDoctor[0]?.doctorFName,
      recordLink: fileLink, // Record link is null if there is no new file
    };
    // console.log(recordData);
    return recordData;
  };

  const updateRecord = (recordData) => {
    return axios.post('https://localhost:7160/api/Records/updateRecord', recordData)
      .then((storeResponse) => {
        // console.log('Record updated successfully:', storeResponse.data);
        alert('File uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error updating record:', error);
        return Promise.reject(error);
      });
  };






  return (
    <div className="container">
      <h5>Upload Documents</h5>
      <form onSubmit={props.type === "Create" ? handleUpload : handleUpdate} className="g-3">
        <input type="text" onChange={handleTitleChange} className="form-control" placeholder="Title" />
        <div className="mb-3">
          <label htmlFor="fileInput" className="form-label">Select a file to upload:</label>
          <input type="file" className="form-control" id="fileInput" onChange={handleFileChange} accept=".pdf" />
        </div>
        <button type="submit" className="btn btn-primary">
          {props.type === "Create" ? "Upload" : "Update"}
        </button>
      </form>
    </div>
  );
};

export default DocumentUpload;
