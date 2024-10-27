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
            <Modal title="Create Class" opened={opened} onClose={close}>
                <form onSubmit={createNewClass}>
                    <TextInput name="nameOfClass" label="Name of Class" />
                    <Group className="m-2" justify="flex-end">
                        <Button color="lightgrey" onClick={close}>
                            Discard
                        </Button>
                        <Button type="submit">Create</Button>
                    </Group>
                </form>
            </Modal>
            {/* Add Class Option */}
            <button
                className="py-4 text-white flex flex-col items-center justify-center w-[250px] bg-[#6c3adb] rounded-lg shadow-lg cursor-pointer"
                onClick={open}
            >
                +<br />
                Add Class
            </button>
        </>
    );
};

export default CreateClassModal;
