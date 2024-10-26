import { Notifications } from "@mantine/notifications"


const HeaderFooter = (props) => {
    return (
        <>
        <div>
        <header style={headerStyle}>
            <div style={buttonContainerStyle}>
                <button style={buttonStyle}>CS 69420</button>
                <button style={buttonStyle}>Settings</button>
                <button style={buttonStyle}>My Classes</button>
                <button style={buttonStyle}>LOG OUT</button>
            </div>
        </header>
        </div>
        <Notifications />
        {props.children}
        <div>
            footer
        </div>
        </>
    )
}

export default HeaderFooter;