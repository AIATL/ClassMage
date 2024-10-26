import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../App";


const ClassResourceManagement = () => {
    const params = useParams();
    const {classId} = params;
    const navigate = useNavigate();

    const {user} = useContext(UserContext);
    
    if (!user) {
        notifications.show({
          title: 'Not Logged In',
          message: 'Please Log in to manage a class',
        })
        navigate("/");
    }

    return (
        <div>
            <h2>{classId + user}</h2>
            <h2>Upload resources for the class to have access to</h2>
        </div>
    )
}

export default ClassResourceManagement;