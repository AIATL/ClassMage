import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";
import { notifications } from "@mantine/notifications";
import HeaderFooter from "../components/HeaderFooter";
import FileUpload from "../components/FileUpload";

const ClassResourceManagement = () => {
    const params = useParams();
    const { classId } = params;
    const navigate = useNavigate();

    const { user } = useContext(UserContext);

    // if (!user) {
    //     console.log("showing noti");
    //     notifications.show({
    //         title: "Not Logged In",
    //         message: "Please Log in to manage a class",
    //     });
    //     // navigate("/");
    // }

    return (
        <HeaderFooter>
            <h2>{classId + user}</h2>
            <h2>Upload resources for the class to have access to</h2>
            {/* File Upload Section */}
            <div className="FileUploadContainer mt-10 w-full flex justify-center items-center">
                <FileUpload />
            </div>
        </HeaderFooter>
    );
};

export default ClassResourceManagement;
