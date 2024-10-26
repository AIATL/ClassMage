// src/routes/Classes.jsx
import React, { useContext, useState } from 'react';
import { Button } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import { logout } from '../auth';
import FileUpload from '../components/FileUpload';
import loginPhoto from '../assets/loginphoto.avif';

function Classes() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [classes, setClasses] = useState([
    { id: 1, name: "CS 69420", documents: [] },
  ]); // Initial placeholder for existing classes

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      navigate('/');
    } catch (error) {
      console.error(`Logout failed: ${error.message}`);
    }
  };

  const handleAddClass = () => {
    const newClass = { id: Date.now(), name: "New Class", documents: [] };
    setClasses([...classes, newClass]);
  };

  const handleDeleteClass = (classId) => {
    setClasses(classes.filter((cls) => cls.id !== classId));
  };

  return (
    <div className="MyClassesPage w-[1440px] h-[1024px] relative bg-white">
      <img className="Rectangle28 w-[650px] h-[75px] left-0 top-0 absolute" src={loginPhoto} alt="Header Decoration" />
      <div className="Rectangle29 w-[650px] h-[75px] left-0 top-0 absolute bg-gradient-to-r from-white to-[#6c3adb]" />
      <div className="Rectangle26 w-[790px] h-[75px] left-[650px] top-0 absolute bg-[#6c3adb]" />
      
      <div className="LogOut w-[167px] h-16 left-[1273px] top-[23px] absolute text-white text-[32px] font-bold font-['Poppins'] leading-loose cursor-pointer" onClick={handleLogout}>
        LOG OUT
      </div>

      <div className="MyClasses w-[398px] h-[65px] left-[539px] top-[111px] absolute text-center text-[#6e6e6e] text-[64px] font-bold font-['Poppins'] leading-[64px]">
        MY CLASSES
      </div>

      <div className="ClassesContainer w-full flex flex-wrap gap-8 mt-10 ml-10">
        {/* Display Existing Classes */}
        {classes.map((cls) => (
          <div key={cls.id} className="Group3 w-[282px] h-36 relative">
            <div className="Rectangle9 w-[282px] h-36 bg-[#bab6bf] rounded-[20px] shadow-lg" />
            <div className="Rectangle11 w-[282px] h-[53px] bg-[#6c3adb] rounded-tl-[20px] rounded-tr-[20px] flex items-center justify-center">
              <h3 className="text-white text-2xl font-bold font-['Poppins']">{cls.name}</h3>
            </div>
            <div className="EditContentDelete w-full h-[79px] flex justify-around items-center text-white text-2xl font-bold font-['Poppins']">
              <button onClick={() => {}}>Edit Content</button>
              <span>|</span>
              <button onClick={() => handleDeleteClass(cls.id)}>Delete</button>
            </div>
          </div>
        ))}

        {/* Add Class Option */}
        <div className="Group4 w-[271px] h-[149px] flex flex-col items-center justify-center bg-[#6c3adb] rounded-[20px] shadow-lg cursor-pointer" onClick={handleAddClass}>
          <div className="AddClass text-white text-2xl font-bold font-['Poppins'] leading-snug">Add Class</div>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="FileUploadContainer mt-10 w-full flex justify-center items-center">
        <FileUpload />
      </div>
    </div>
  );
}

export default Classes;
