// src/routes/Classes.jsx
import React, { useContext, useState } from "react";
import { Button } from "@mantine/core";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import FileUpload from "../components/FileUpload";
import loginPhoto from "../assets/loginphoto.avif";
import HeaderFooter from "../components/HeaderFooter";
import CreateClassModal from "../components/CreateClassModal";

function Classes() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const [classes, setClasses] = useState([
        { id: 1, name: "CS 69420", documents: [] },
    ]);

    return (
        <HeaderFooter>
            <div className="w-full h-full bg-white p-8 relative flex flex-col items-center">
                <div className="w-full flex items-center justify-between mb-10">
                    <h1 className="text-4xl font-bold text-[#6e6e6e]">MY CLASSES</h1>
                </div>

                <div className="w-full flex flex-wrap gap-8 justify-center items-start">
                    {/* Display Existing Classes */}
                    {classes.map((cls) => (
                        <div key={cls.id} className="flex flex-col w-[250px] bg-[#bab6bf] rounded-lg shadow-lg p-4">
                            <h3 className="text-center text-2xl font-bold text-[#6c3adb]">{cls.name}</h3>
                            <div className="mt-4">
                                <Button className="m-auto mb-2" color="dark" onClick={() => {navigate("/classes/") + cls.name}} >Edit Grounding Content</Button>
                                <Button color="red" onClick={() => handleDeleteClass(cls.id)}>Delete</Button>
                            </div>
                        </div>
                    ))}
                    

                    <CreateClassModal />
                </div>
            </div>
        </HeaderFooter>
    );
}

export default Classes;
