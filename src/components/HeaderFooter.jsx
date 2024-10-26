// src/components/HeaderFooter.jsx
import { Notifications } from "@mantine/notifications";
import { useContext } from "react";
import { UserContext } from "../App";
import { Link } from "react-router-dom";
import { Button } from "@mantine/core";

const HeaderFooter = ({ children }) => {
    const { user, setUser } = useContext(UserContext)

    const handleLogout = async () => {
        try {
            await logout();
            setUser(null);
            navigate("/");
        } catch (error) {
            console.error(`Logout failed: ${error.message}`);
        }
    };

    return (
        <>
            <header className="w-full h-[75px] bg-[#6c3adb] flex items-center justify-between p-4 text-white font-bold text-lg">
                <div>ClassMage</div>
                <Link to={"/classes"}>My Classes</Link>
                <Button color="dark" onClick={handleLogout}>LOG OUT</Button>
                <div>header</div> {/* Placeholder for actual header content */}
            </header>
            <Notifications position="top-right" />
            <main className="flex-grow">{children}</main>
            <footer className="fixed bottom-0 w-full h-[50px] bg-[#6c3adb] flex items-center justify-center text-white">
                footer
            </footer>
        </>
    );
};

export default HeaderFooter;
