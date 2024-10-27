// src/components/FileUpload.jsx
import React, { useState, useContext } from "react";
import { Button, FileInput, Notification } from "@mantine/core";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { notifications } from "@mantine/notifications";
import { UserContext } from '../App';

function FileUpload({ classId }) {
  const {user} = useContext(UserContext);
  const [file, setFile] = useState(null);
  const [fileUploadMessage, setFileUploadMessage] = useState("");

  const handleFileUpload = async () => {
    if (!file || !classId) return; // Ensure file and classId are set
    setFileUploadMessage("");
    
    try {
      const storage = getStorage();
      const storageRef = ref(storage, `${user.uid}/${classId}/${file.name}`);
      // Upload the file to Firebase Storage
      await uploadBytes(storageRef, file);
      await getDownloadURL(storageRef);

      setFileUploadMessage("File uploaded successfully!");

      notifications.show({
        title: "Upload Successful",
        message: "Your file was uploaded successfully.",
        color: "green",
      });

    } catch (error) {
      setFileUploadMessage(`File upload failed: ${error.message}`);
      
      notifications.show({
        title: "Upload Failed",
        message: "Failed to upload file. Please try again.",
        color: "red",
      });
      console.error("File upload error:", error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Upload a File</h2>
      <FileInput
        placeholder="Choose a file"
        value={file}
        onChange={setFile}
        required
      />
      <Button onClick={handleFileUpload} disabled={!file}>
        Upload File
      </Button>
      {fileUploadMessage && (
        <Notification color="blue">{fileUploadMessage}</Notification>
      )}
    </div>
  );
}

export default FileUpload;
