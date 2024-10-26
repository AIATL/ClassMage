// src/components/AuthForm.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Notification, FileInput } from '@mantine/core';
import { registerWithEmail, loginWithEmail, loginWithGoogle, logout, uploadFile } from '../auth';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { UserContext } from '../App';

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [file, setFile] = useState(null); // State to hold the selected file
  const [errorMessage, setErrorMessage] = useState('');
  const [fileUploadMessage, setFileUploadMessage] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && (currentUser.emailVerified || currentUser.providerData[0].providerId === 'google.com')) {
        setUser(currentUser);
        navigate('/success');
      } else {
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, [navigate, setUser]);

  const handleSignUp = async () => {
    setErrorMessage('');
    try {
      await registerWithEmail(email, password);
      setErrorMessage('Please check your email to verify your account. Once verified, you will be automatically logged in.');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const loggedInUser = await loginWithEmail(email, password);
      setUser(loggedInUser);
      navigate('/success');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    if (!email) {
      setErrorMessage('Please enter your email to check your sign-in method.');
      return;
    }
    try {
      const googleUser = await loginWithGoogle(email);
      setUser(googleUser);
      navigate('/success');
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => navigate('/'), 3000);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      setErrorMessage(`Logout failed: ${error.message}`);
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
    <div style={{ padding: '20px' }}>
      <h1>Firebase Authentication</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}</p>
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
        </>
      ) : (
        <>
          <TextInput placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <TextInput placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errorMessage && <Notification color="red">{errorMessage}</Notification>}
          <Button onClick={handleSignUp}>Sign Up</Button>
          <Button onClick={handleLogin}>Log In</Button>
          <Button onClick={handleGoogleLogin}>Log In with Google</Button>
        </>
      )}
    </div>
  );
}

export default AuthForm;
