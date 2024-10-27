// src/routes/ChatPage.jsx
import { useState, useEffect } from "react";
import {
    Button,
    TextInput,
    ScrollArea,
    Modal,
    Loader,
    ActionIcon,
} from "@mantine/core";
import { IconSend, IconTrash } from "@tabler/icons-react";
import mageHatIcon from "/src/assets/MageHat1.png"; // Icon for CourseMage
import { fetchAIResponse } from "../utils/fetchAIResponse";
import { useParams } from "react-router-dom";
import { getFirebaseFileUrl } from "../firebase";
import DocViewer from "@cyntler/react-doc-viewer";
import "@cyntler/react-doc-viewer/dist/index.css";

const ChatPage = () => {
    let { classId } = useParams();
    const storedTopics = JSON.parse(
        localStorage.getItem("chatTopics" + classId)
    ) || [{ id: Date.now(), title: "Current Chat", messages: [] }];
    const [topics, setTopics] = useState(storedTopics);
    const [currentTopic, setCurrentTopic] = useState(storedTopics[0]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [newTopicModalOpen, setNewTopicModalOpen] = useState(false);
    const [newTopicName, setNewTopicName] = useState("");
    const [showDeleteOptions, setShowDeleteOptions] = useState(false);
    const [urlToEmbed, setUrlToEmbed] = useState(null);

    useEffect(() => {
        localStorage.setItem("chatTopics" + classId, JSON.stringify(topics));
    }, [topics]);

    const messages = currentTopic?.messages || [];

    const updateUrlToEmbed = async (newUrl) => {
        if (newUrl == null) {
            setUrlToEmbed(null);
            return;
        }
        const url = await getFirebaseFileUrl(newUrl);
        let fileContext = null;
        if (!!url) {
            fileContext = (
                <div>
                    <DocViewer
                        documents={[{ uri: url }]}
                    />
                </div>
            );
            setUrlToEmbed(fileContext);
        }
    };

    const handleSendMessage = async (event) => {
        event.preventDefault();
        if (!input.trim()) return;
        const priorQueries = currentTopic;
        const newMessages = [...messages, { sender: "User", text: input }];
        updateCurrentTopicMessages(newMessages);
        setInput("");
        setIsTyping(true);

        try {
            var { response, source } = await fetchAIResponse(classId, input, priorQueries);
            if (typeof response == 'undefined') {
                response = 'Please give me more info so that I can help you better.'
            }
            const botMessage = {
                sender: "CourseMage",
                text: `${response}`,
            };
            updateUrlToEmbed(source);
            updateCurrentTopicMessages([...newMessages, botMessage]);
        } catch (error) {
            console.error("Error fetching AI response:", error);
            updateCurrentTopicMessages([
                ...newMessages,
                {
                    sender: "CourseMage",
                    text: "I'm having trouble retrieving the answer. Please try again later.",
                },
            ]);
        } finally {
            setIsTyping(false);
        }
    };

    const updateCurrentTopicMessages = (newMessages) => {
        const updatedTopics = topics
            .map((topic) =>
                topic.id === currentTopic.id
                ? { ...topic, messages: newMessages }
                : topic
            )
            .sort((a, b) => (a.id === currentTopic.id ? -1 : b.id === currentTopic.id ? 1 : 0));
        setTopics(updatedTopics);
        setCurrentTopic((prev) => ({ ...prev, messages: newMessages }));
    };

    const handleCreateNewTopic = () => {
        const newTopic = {
            id: Date.now(),
            title: newTopicName || `Topic ${topics.length + 1}`,
            messages: [],
        };
        setTopics([newTopic, ...topics]); // Add new topic to the top of the list
        setCurrentTopic(newTopic);
        setNewTopicName("");
        setNewTopicModalOpen(false);
        setUrlToEmbed(null);
    };

    const handleDeleteTopic = (topicId) => {
        const updatedTopics = topics.filter((topic) => topic.id !== topicId);
        setTopics(updatedTopics);
        if (currentTopic.id === topicId && updatedTopics.length > 0) {
            setCurrentTopic(updatedTopics[0]);
        } else if (updatedTopics.length === 0) {
            setCurrentTopic(null);
        }
    };

    return (
        <div className="w-full h-screen flex bg-gray-100">
            {/* Sidebar for Chat Topics */}
            <div className="w-1/4 h-full bg-[#6c3adb] text-white flex flex-col p-4">
                <h2 className="text-xl font-bold mb-6">{classId.split("**")[1] +" "}Chat Topics</h2>
                <ScrollArea style={{ flexGrow: 1 }}>
                    <div className="space-y-2">
                        {topics.map((topic) => (
                            <div
                                key={topic.id}
                                onClick={() => {
                                    setUrlToEmbed(null);
                                    setCurrentTopic(topic);
                                }}
                                className={`cursor-pointer p-2 rounded-md flex items-center justify-between ${
                                    topic.id === currentTopic.id
                                        ? "bg-white text-[#6c3adb]"
                                        : "bg-[#6c3adb] text-white"
                                }`}
                            >
                                <span>{topic.title}</span>
                                {showDeleteOptions && (
                                    <ActionIcon
                                        color="red"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleDeleteTopic(topic.id);
                                        }}
                                    >
                                        <IconTrash size={16} />
                                    </ActionIcon>
                                )}
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <Button
                    onClick={() => setNewTopicModalOpen(true)}
                    className="mt-6 bg-white text-[#6c3adb]"
                >
                    Start New Topic
                </Button>
                <Button
                    onClick={() => setShowDeleteOptions(!showDeleteOptions)}
                    variant="subtle"
                    color="white"
                    className="mt-2"
                >
                    {showDeleteOptions ? "Done" : "Manage Topics"}
                </Button>
            </div>

            {/* Main Chat Window */}
            <div className="w-3/4 h-full flex flex-col">
                <div className="flex-grow p-6 overflow-y-auto">
                    <ScrollArea style={{ height: "calc(100vh - 140px)" }}>
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center ${
                                        msg.sender === "User"
                                            ? "justify-end"
                                            : "justify-start"
                                    }`}
                                >
                                    {msg.sender === "CourseMage" && (
                                        <img
                                            src={mageHatIcon}
                                            alt="CourseMage Icon"
                                            className="w-8 h-8 mr-2"
                                        />
                                    )}
                                    <div
                                        className={`${
                                            msg.sender === "User"
                                                ? "bg-blue-500 text-white self-end"
                                                : "bg-gray-200 text-black self-start text-left"
                                        } max-w-[75%] p-4 rounded-lg shadow-md whitespace-pre-line`}
                                        style={{ whiteSpace: 'pre-wrap', textAlign: 'left' }}
                                    >
                                        <p>{msg.text}</p>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex items-center justify-start">
                                    <img
                                        src={mageHatIcon}
                                        alt="CourseMage Typing"
                                        className="w-8 h-8 mr-2"
                                    />
                                    <div className="bg-gray-200 text-black p-4 rounded-lg shadow-md">
                                        <Loader size="xs" color="blue" />
                                    </div>
                                </div>
                            )}
                            {urlToEmbed}
                        </div>
                    </ScrollArea>
                </div>

                {/* Chat Input */}
                <form
                    onSubmit={handleSendMessage}
                    className="p-4 bg-white border-t border-gray-200 flex items-center"
                >
                    <TextInput
                        placeholder="Type your message here..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="flex-grow mr-4"
                    />
                    <Button
                        color="blue"
                        type="submit"
                        leftIcon={<IconSend size={18} />}
                    >
                        Send
                    </Button>
                </form>
            </div>

            {/* Modal for New Topic */}
            <Modal
                opened={newTopicModalOpen}
                onClose={() => setNewTopicModalOpen(false)}
                title="Enter Topic Name"
                centered
            >
                <TextInput
                    placeholder="Topic Name"
                    value={newTopicName}
                    onChange={(event) => setNewTopicName(event.target.value)}
                />
                <Button
                    onClick={handleCreateNewTopic}
                    className="mt-4"
                    fullWidth
                >
                    Create Topic
                </Button>
            </Modal>
        </div>
    );
};

export default ChatPage;
