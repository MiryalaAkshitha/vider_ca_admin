import React from "react";
import { Menu, MenuItem, Typography } from "@mui/material";

const ActionsMenu = ({ options, actionsAnchorEl, setActionsAnchorEl }) => {
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
      {options.map((data, index) => {
        return (
          <MenuItem key={index} sx={{ py: 2, m: 0 }}>
            <Typography variant="body2">{data}</Typography>
          </MenuItem>
        );
      })}
    </Menu>
  );
};

export default ActionsMenu;
