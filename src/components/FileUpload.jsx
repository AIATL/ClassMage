// src/components/FileUpload.jsx
import React, { useState } from 'react';
import { Button, FileInput, Notification } from '@mantine/core';
import { uploadFile } from '../auth';

function FileUpload() {

  const [file, setFile] = useState(null);
  const [fileUploadMessage, setFileUploadMessage] = useState('');

  const handleFileUpload = async () => {
    setFileUploadMessage('');
    try {
      const fileURL = await uploadFile(file); // Upload file to Firebase Storage
      setFileUploadMessage(`File uploaded successfully! File URL: ${fileURL}`);
    } catch (error) {
      setFileUploadMessage(`File upload failed: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Upload a File</h2>
      <FileInput 
        placeholder="Choose a file" 
        value={file} 
        onChange={setFile} 
        required 
      />
      <Button onClick={handleFileUpload} disabled={!file}>Upload File</Button>
      {fileUploadMessage && <Notification color="blue">{fileUploadMessage}</Notification>}
    </div>
  );
}

export default FileUpload;
