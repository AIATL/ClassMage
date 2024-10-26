import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

const CreateClassModal = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return (
        <>
            <Modal opened={opened} onClose={close}>
                Hi Everyone
            </Modal>

            <Button onClick={open}>Create Class</Button>
        </>
    );
};

export default CreateClassModal;
