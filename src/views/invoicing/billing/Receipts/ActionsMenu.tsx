import { Menu, MenuItem } from "@mui/material";

const ActionsMenu = ({ actionsAnchorEl, setActionsAnchorEl }) => {
    const handleClose = () => {
        setActionsAnchorEl(null);
    };
    const open = Boolean(actionsAnchorEl);

    return (
        <Menu
            id="basic-menu"
            anchorEl={actionsAnchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
                "aria-labelledby": "basic-button",
            }}
            sx={{
                top: "10px",
                left: "16px",
                ".MuiMenu-list": {
                    padding: "0",
                },
            }}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
        >
            <MenuItem sx={{ py: 2, m: 0 }}>Download Receipt as PDF</MenuItem>
        </Menu>
    );
};

export default ActionsMenu;
