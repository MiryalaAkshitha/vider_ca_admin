import { Button, Menu, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LocalNotificationsBody from "./LocalNotificationsBody";

function LocalNotifications({
  localNotificationsAnchorEl,
  setLocalNotificationsAnchorEl,
}) {
  const open = Boolean(localNotificationsAnchorEl);

  const handleClose = () => {
    setLocalNotificationsAnchorEl(null);
  };

  return (
    <Box>
      <Menu
        id="basic-menu"
        anchorEl={localNotificationsAnchorEl}
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
      >
        <Paper
          elevation={20}
          sx={{
            width: "670px",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
              borderBottom: "3px solid #F5F5F5",
            }}
          >
            <Typography variant="subtitle2">Notifications</Typography>
            <Button
              sx={{ minWidth: 80 }}
              size="small"
              onClick={(e) => handleClose()}
            >
              Close
            </Button>
          </Box>
          <LocalNotificationsBody />
        </Paper>
      </Menu>
    </Box>
  );
}

export default LocalNotifications;
