// src/components/HeaderFooter.jsx
import { Notifications } from "@mantine/notifications";

const HeaderFooter = ({ children }) => {
    return (
        <>
            <header className="w-full h-[75px] bg-[#6c3adb] flex items-center justify-between p-4 text-white font-bold text-lg">
                <div>ClassMage</div>
                <div>header</div> {/* Placeholder for actual header content */}
            </header>
            <Notifications position="top-right" />
            <main className="flex-grow">{children}</main>
            <footer className="w-full h-[50px] bg-[#6c3adb] flex items-center justify-center text-white">
                footer
            </footer>
        </>
    );
};

export default HeaderFooter;
