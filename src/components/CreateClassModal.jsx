import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { setUserClasses } from "../firebase";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const CreateClassModal = ({addClass}) => {
    const { user } = useContext(UserContext);
    const [opened, { open, close }] = useDisclosure(false);


    async function createNewClass(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const nameOfClass = formData.get("nameOfClass");

        addClass(nameOfClass);
    }

    return (
        <>
            <div onClick={() => setOpened(true)} className={buttonClassName}>
                Add Class
            </div>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                title="Enter Class Name"
                centered
            >
                <TextInput
                    placeholder="Class Name"
                    value={className}
                    onChange={(event) => setClassName(event.target.value)}
                />
                <Button onClick={handleCreate} className="mt-4" fullWidth>
                    Create
                </Button>
            </Modal>
        </>
    );
}

export default CreateClassModal;
