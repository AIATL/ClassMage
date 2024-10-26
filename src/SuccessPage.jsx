// src/SuccessPage.jsx
import React, { useContext } from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './App';
import { logout } from './auth';
import FileUpload from './components/FileUpload';

function SuccessPage() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Welcome, {user?.email}</h1>
      <p>Your account has been successfully created and verified.</p>

      <Button onClick={handleLogout}>Log Out</Button>

      {/* FileUpload Component */}
      <FileUpload />
    </div>
  );
}

export default SuccessPage;
