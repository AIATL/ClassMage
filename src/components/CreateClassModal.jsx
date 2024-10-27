import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { setUserClasses } from "../firebase";
import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";

const CreateClassModal = ({addClass}) => {
    const [opened, { open, close }] = useDisclosure(false);


    async function createNewClass(event) {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);
        const nameOfClass = formData.get("nameOfClass");

        addClass(nameOfClass);
        close();
    }

    return (
        <>
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
                /><Button onClick={close} color="lightgrey" className="mt-4 " fullWidth>
                    Discard
                </Button>
                <Button onClick={createNewClass} className="mt-4" fullWidth>
                    Create
                </Button>
            </Modal>
        </>
    );
}

export default CreateClassModal;
