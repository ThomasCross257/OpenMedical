import React, { useState } from 'react';

const DocumentUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {

      // AXios upload functionality goes here. Will need to be tested later
      /*
      const formData = new FormData();
      formData.append('file', selectedFile);

      axios.post('your-upload-url', formData)
        .then((response) => {
          // Handle success
          console.log('File uploaded successfully:', response);
        })
        .catch((error) => {
          // Handle error
          console.error('File upload error:', error);
        });
      */
     console.log('File uploaded successfully:', selectedFile);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div className="container">
      <h5>Upload Documents</h5>
      <div className="mb-3">
        <label htmlFor="fileInput" className="form-label">Select a file to upload:</label>
        <input type="file" className="form-control" id="fileInput" onChange={handleFileChange} />
      </div>
      <button className="btn btn-primary" onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default DocumentUpload;
