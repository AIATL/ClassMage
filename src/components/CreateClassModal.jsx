import { Button, Group, Modal, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const CreateClassModal = ({ addClass }) => {
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
                onClose={close}
                title="Enter Class Name"
                centered
                onSubmit={createNewClass}
            >
                <form>
                <TextInput name="nameOfClass" placeholder="Class Name" />
                <Group>
                <Button
                    onClick={close}
                    color="lightgrey"
                    className="mt-4 "
                >
                    Discard
                </Button>
                <Button type="submit" className="mt-4" >
                    Create
                </Button>
                </Group>
                </form>
            </Modal>
            <button onClick={open} className="w-[250px] h-[150px] bg-[#6c3adb] rounded-lg shadow-lg cursor-pointer flex items-center justify-center text-white text-2xl font-bold">+<br />
                Create Class
            </button>
        </>
    );
};

export default CreateClassModal;
