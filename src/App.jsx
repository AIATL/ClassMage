// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import AuthForm from "./routes/AuthForm";
import { createContext, useState } from "react";
import Classes from "./routes/Classes";
import "./App.css";
import "@mantine/notifications/styles.css";
import ClassResourceManagement from "./routes/ClassReasourceManagmenet";
import ChatPage from "./routes/ChatPage";

const theme = createTheme({});
export const UserContext = createContext();

function App() {
    const [user, updateUser] = useState();

    const setUser = (user) => {
        updateUser(user);
    };

    return (
        <MantineProvider theme={theme}>
            <UserContext.Provider value={{ user, setUser }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<AuthForm />} />
                        <Route path="/classes" element={<Classes />} />
                        <Route
                            path="/classes/:classId"
                            element={<ClassResourceManagement />}
                        />
                        <Route path="/chatpage/:classId" element={<ChatPage />} />
                    </Routes>
                </Router>
            </UserContext.Provider>
        </MantineProvider>
    );
}

export default App;
