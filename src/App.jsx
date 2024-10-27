// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import AuthForm from "./routes/AuthForm";
import Classes from "./routes/Classes";
import "@mantine/notifications/styles.css";
import ChatPage from "./routes/ChatPage";
import ClassResourceManagement from "./routes/ClassResourceManagement";
import { createContext, useState } from "react";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

const theme = createTheme({});
export const UserContext = createContext();

function App() {
    const [user, updateUser] = useState();

    const setUser = (user) => {
        updateUser(user);
    };

    return (
        <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
            <Notifications position="top-right" /> 
            <UserContext.Provider value={{ user, setUser }}>
                <Router>
                    <Routes>
                        <Route path="/" element={<AuthForm />} />
                        <Route path="/classes" element={<Classes />} />
                        <Route path="/classes/:classId" element={<ClassResourceManagement />} />
                        <Route path="/chat/:classId" element={<ChatPage />} /> {/* Updated route */}
                    </Routes>
                </Router>
            </UserContext.Provider>
        </MantineProvider>
    );
}

export default App;
