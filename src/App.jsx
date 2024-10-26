// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { MantineProvider, createTheme } from '@mantine/core';
import SuccessPage from './SuccessPage';
import AuthForm from './components/AuthForm';
import { createContext, useState } from 'react';

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
            <Route path="/success" element={<SuccessPage />} />
          </Routes>
        </Router>
      </UserContext.Provider>
    </MantineProvider>
  );
}

export default App;
