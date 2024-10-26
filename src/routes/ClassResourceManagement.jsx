// src/routes/ClassResourceManagement.jsx
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { notifications } from "@mantine/notifications";
import HeaderFooter from "../components/HeaderFooter";
import FileUpload from "../components/FileUpload";

const ClassResourceManagement = () => {
    const params = useParams();
    const { classId } = params;
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    return (
        <HeaderFooter>
            <div className="w-full h-full flex flex-col items-center p-10 bg-white">
                <h2 className="text-3xl font-bold mb-4">Manage Resources for {classId}</h2>
                <p className="text-lg text-gray-600 mb-8">Upload resources for the class to access</p>
                
                {/* File Upload Section */}
                <div className="w-full flex justify-center items-center">
                    <FileUpload />
                </div>
            </div>
        </HeaderFooter>
    );
};

export default ClassResourceManagement;
