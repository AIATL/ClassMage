// src/components/AuthForm.jsx
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextInput, Notification } from '@mantine/core';
import { registerWithEmail, loginWithEmail, loginWithGoogle } from '../auth';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';
import { UserContext } from '../App';
import mageHatIcon from "./../assets/MageHat1.png"
import loginPhoto from "./../assets/loginphoto.avif"

function AuthForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Disable scrolling on mount
    document.body.style.overflow = 'hidden';
    
    // Restore scrolling on unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

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
      setErrorMessage('Please check your email to verify your account.');
    } catch (error) {
      setErrorMessage('An error occurred during sign up. Please try again.');
    }
  };

  const handleLogin = async () => {
    setErrorMessage('');
    try {
      const loggedInUser = await loginWithEmail(email, password);
      setUser(loggedInUser);
      navigate('/success');
    } catch (error) {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    try {
      const googleUser = await loginWithGoogle();
      setUser(googleUser);
      navigate('/classes');
    } catch (error) {
      setErrorMessage('Unable to sign in with Google. Please try again later.');
    }
  };

  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-white">
      {/* Background Image */}
      <img src={loginPhoto} alt="Background decoration" className="absolute w-[1108px] h-[1664px] left-[-355px] top-[-500px] origin-top-left" />

      {/* Login Box */}
      <div className="flex flex-col items-center space-y-6 bg-white p-8 rounded-lg shadow-lg w-[400px] h-auto fixed right-52">
        <div className="flex items-center mb-4">
          <img src={mageHatIcon} alt="Mage Hat Icon" className="w-10 h-10 mr-3" />
          <h1 className="text-[#6c3adb] text-4xl font-black font-['Inknut Antiqua']">ClassMage</h1>
        </div>

        <h2 className="text-[#6e6e6e] text-2xl font-bold font-['Poppins']">Teacher Login</h2>
        
        <div className="w-full">
          <TextInput
            placeholder="Email"
            value={email}
            label="Username"
            onChange={(e) => setEmail(e.target.value)}
            classNames={{
              root: "",
              input: "bg-white",
              label: "text-[#6e6e6e] text-lg font-bold font-['Poppins'] mb-2",
            }}
            className="w-full"
          />
        </div>

        <div className="w-full">
          <label className="text-[#6e6e6e] text-lg font-bold font-['Poppins'] mb-2">Password</label>
          <TextInput
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            classNames={{
              root: "",
              input: "bg-white ",
              label: "text-[#6e6e6e] text-lg font-bold font-['Poppins'] mb-2",
            }}
          />
        </div>

        {errorMessage && <p className="text-red-600 mt-4">{errorMessage}</p>}

        <button onClick={handleLogin} className="w-full bg-[#6c3adb] text-white py-3 rounded-full text-lg font-bold">LOGIN</button>
        <button onClick={handleSignUp} className="w-full bg-[#d9d9d9] text-[#6e6e6e] py-3 rounded-full text-lg font-bold">SIGN UP</button>
        <button onClick={handleGoogleLogin} className="w-full bg-[#d9d9d9] text-[#6e6e6e] py-3 rounded-full text-lg font-bold flex items-center justify-center space-x-2">
          <img src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt="Google logo" className="w-5 h-5" />
          <span>Sign In with Google</span>
        </button>
      </div>
    </div>
  );
}

export default AuthForm;
