import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const CreateClassModal = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal opened={opened} onClose={close}>
                Hi Everyone
            </Modal>
            {/* Add Class Option */}
            <Button className="flex flex-col items-center justify-center w-[250px] h-[150px] bg-[#6c3adb] rounded-lg shadow-lg cursor-pointer" onClick={open}>
                <h3 className="text-white text-2xl font-bold">Add Class</h3>
            </Button>
        </>
    );
};

export default CreateClassModal;
