import SearchContainer from "components/SearchContainer";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Paper, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Message from "views/chats/Chat/Message";
import ChatMessages from "views/chats/Chat/ChatMessages";
import Chat from "views/chats/Chat";

const ChannelsMembers = () => {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          padding: "2px",
          backgroundColor: "grey",
          width: "100%",
        }}
      >
        <div style={{ margin: "3px" }}>
          <SearchContainer onChange={setSearch} minWidth="100%" />
        </div>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: "100%",
            backgroundColor: "lightgray",
            padding: "3px",
          }}
        >
          <Typography variant="caption">Channels</Typography>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <AddIcon />
            <Typography variant="caption">Add New</Typography>
          </div>
        </Paper>
        <Typography variant="body2">#Company_registration</Typography>
        <Typography variant="body2">#GST</Typography>
        <Typography variant="body2">#TDS</Typography>
        <Typography variant="body2">#Invoing</Typography>
        <Typography variant="body2">#General</Typography>
      </Box>
      <div>
        <Paper
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minWidth: "100%",
            backgroundColor: "lightgray",
            padding: "3px",
          }}
        >
          <Typography variant="caption">Members</Typography>
        </Paper>
        <Message data="hi" />
      </div>
    </>
  );
};

export default ChannelsMembers;
