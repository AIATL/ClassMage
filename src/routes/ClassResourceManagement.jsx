import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { notifications } from "@mantine/notifications";
import { Button } from "@mantine/core";
import HeaderFooter from "../components/HeaderFooter";
import FileUpload from "../components/FileUpload";

const ClassResourceManagement = () => {
    const { classId } = useParams();
    const { user } = useContext(UserContext);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const navigate = useNavigate();

    // Fetch files from Firebase Storage
    useEffect(() => {
        const fetchFiles = async () => {
            if (!user || !classId) return;

            const storage = getStorage();
            const listRef = ref(storage, `${user.uid}/${classId}/`);

            try {
                const res = await listAll(listRef);
                const filePromises = res.items.map(async (itemRef) => {
                    const url = await getDownloadURL(itemRef);
                    return { name: itemRef.name, url };
                });

                const files = await Promise.all(filePromises);
                setUploadedFiles(files);
            } catch (error) {
                console.error("Error fetching files:", error);
                notifications.show({
                    title: "Error",
                    message: "Failed to retrieve uploaded files.",
                    color: "red",
                });
            }
        };

        fetchFiles();
    }, [user, classId]);

    const handleCopyLink = () => {
        const chatLink = `${window.location.origin}/chat/${classId}`;
        navigator.clipboard.writeText(chatLink)
            .then(() => {
                notifications.show({
                    title: "Link Copied",
                    message: "Chat link copied to clipboard!",
                    color: "green",
                });
            })
            .catch(() => {
                notifications.show({
                    title: "Copy Failed",
                    message: "Failed to copy the link. Try again.",
                    color: "red",
                });
            });
    };

    return (
        <HeaderFooter>
            <div className="w-full h-full flex flex-col items-center p-10 bg-white">
                <h2 className="text-3xl font-bold mb-4">Manage Resources for {classId}</h2>
                <p className="text-lg text-gray-600 mb-8">Upload resources for the class to access</p>

                {/* File Upload Section */}
                <div className="w-full flex justify-center items-center mb-8">
                    <FileUpload classId={classId} />
                </div>

                {/* Display Uploaded Files */}
                <div className="w-full max-w-md mt-6">
                    <h3 className="text-2xl font-semibold mb-4">Uploaded Files</h3>
                    {uploadedFiles.length > 0 ? (
                        <ul>
                            {uploadedFiles.map((file) => (
                                <li key={file.name} className="mb-2">
                                    <a
                                        href={file.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline"
                                    >
                                        {file.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No files uploaded yet.</p>
                    )}
                </div>

                {/* Copy Chat Link Button */}
                <Button color="blue" onClick={handleCopyLink} className="mt-8">
                    Copy Class Chat Link
                </Button>
            </div>
        </HeaderFooter>
    );
};

export default ClassResourceManagement;
