import { Notifications } from "@mantine/notifications"


const HeaderFooter = (props) => {
    return (
        <>
        <div>
            header
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