// src/SuccessPage.jsx
import React, { useState, useContext } from 'react';
import { Button, FileInput, Notification } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './App';
import { logout, uploadFile } from './auth';

function SuccessPage() {
  const { user, setUser } = useContext(UserContext); // Access the authenticated user from context
  const [file, setFile] = useState(null);
  const [fileUploadMessage, setFileUploadMessage] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      setFileUploadMessage(`Logout failed: ${error.message}`);
    }
  };

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
      <h1>Welcome, {user?.email}</h1>
      <p>Your account has been successfully created and verified.</p>

      <Button onClick={handleLogout}>Log Out</Button>

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

export default SuccessPage;
