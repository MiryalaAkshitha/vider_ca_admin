import ChatIcon from "@mui/icons-material/Chat";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import RecentChats from "views/chats/RecentChats";

function BottomAppbar() {
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 0,
        width: "100%",
        background: "white",
        boxShadow: "0px -1px 3px rgba(0, 0, 0, 0.1)",
        display: "flex",
        py: 1,
        pl: 14,
      }}
    >
      <Box
        onClick={() => {
          setOpen(!open);
          document.body.style.overflow = open ? "auto" : "hidden";
        }}
        sx={{
          cursor: "pointer",
          p: "2px",
          pb: "4px",
          pr: 3,
          position: "relative",
        }}
      >
        <Box textAlign="center">
          <ChatIcon
            sx={{ color: "rgba(0,0,0,0.5)", fontSize: 20 }}
            fontSize="small"
          />
          <Typography
            sx={{ display: "block", lineHeight: "0px", fontSize: 9 }}
            variant="caption"
          >
            Chats
          </Typography>
        </Box>
      </Box>
      {open && <RecentChats setOpen={setOpen} />}
    </Box>
  );
}

export default BottomAppbar;
