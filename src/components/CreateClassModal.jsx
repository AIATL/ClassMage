import React, { useState } from "react";
import { Button, Modal, TextInput } from "@mantine/core";

function CreateClassModal({ onAddClass, buttonClassName }) {
    const [opened, setOpened] = useState(false);
    const [className, setClassName] = useState("");

    const handleCreate = () => {
        if (className.trim()) {
            const newClass = {
                id: Date.now(),
                name: className,
                documents: [],
            };
            onAddClass(newClass);  // Pass the new class data back to Classes component
            setClassName("");      // Clear input
            setOpened(false);      // Close modal
        }
    };

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
