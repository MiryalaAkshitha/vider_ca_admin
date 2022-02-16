import React from "react";
import { Menu, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import NotificationsTabs from "./NotificationsTabs";

function Notifications({ notificationsAnchorEl, setNotificationsAnchorEl }) {
  const open = Boolean(notificationsAnchorEl);

  const handleClose = () => {
    setNotificationsAnchorEl(null);
  };

  return (
    <Box>
      <Menu
        id="basic-menu"
        anchorEl={notificationsAnchorEl}
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
            width: "770px",
            height: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "10px 20px",
            }}
          >
            <Typography variant="subtitle2">Global Activity</Typography>
            <Typography
              variant="body2"
              sx={{ cursor: "pointer" }}
              onClick={(e) => handleClose()}
            >
              Close
            </Typography>
          </Box>
          <NotificationsTabs />
        </Paper>
      </Menu>
    </Box>
  );
}

export default Notifications;
