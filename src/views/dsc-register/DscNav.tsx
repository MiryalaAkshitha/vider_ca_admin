import { Box, List, ListItemButton, Typography } from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import RouterLink from "components/RouterLink";
import CollapsibleMenuDrop from "../../layout/primarylayout/CollapsibleMenuDrop";
import { useLocation } from "react-router-dom";
import { settingMenu } from "data/settingsMenu";

const reportsMenu = [
    {
        title: "DSC",
        path: "",
        pathName: "/dsc-register",
    },
    {
        title: "GST",
        path: "/dsc-register/gstr-1",
        pathName: "/dsc-register/gstr-1",
    },
    // {
    //     title: "GST",
    //     path: "/dsc-register/gstr-1",
    //     pathName: "/dsc-register/gstr-3b",
    // }

];

const DscNav = () => {
    const location = useLocation();
    console.log(settingMenu)


    return (
        <Box
            sx={{
                width: 200,
                borderRight: "1px solid #e0e0e0 ",
                minHeight: 650,
            }}
        >
            <List>
                <RouterLink to={reportsMenu[0].path}>
                    <ListItemButton
                        selected={reportsMenu[0].pathName === location.pathname}
                        sx={{
                            ...(reportsMenu[0].pathName === location.pathname && {
                                borderRight: "3px solid red",
                                borderRadius: "2px",
                            }),
                        }}
                    >
                        <ListItemText primary={<Typography variant="body2">{reportsMenu[0].title}</Typography>} />
                    </ListItemButton>
                </RouterLink>
                <CollapsibleMenuDrop item={settingMenu[0]} />
            </List>
        </Box>
    );
};

export default DscNav;