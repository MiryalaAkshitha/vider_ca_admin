import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import Chat from "./Chat";
import ChatItem from "./ChatItem";
import {
  StyledChatHeader,
  StyledChatSearch,
  StyledChatsWrapper,
  StyledRecentChatsContainer,
} from "./styles";

interface Props {
  setOpen: (open: boolean) => void;
}

function RecentChats({ setOpen }: Props) {
  const [openChat, setOpenChat] = useState(true);

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <StyledChatsWrapper>
      <StyledRecentChatsContainer>
        <StyledChatHeader>
          <Typography variant="body1">Chats</Typography>
          <Box>
            <IconButton size="small" onClick={handleClose}>
              <RemoveRoundedIcon />
            </IconButton>
            <IconButton size="small" onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </StyledChatHeader>
        <Box>
          <StyledChatSearch
            type="text"
            placeholder="Search for a member or a group"
          />
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
            <React.Fragment key={item}>
              <ChatItem />
              <Divider />
            </React.Fragment>
          ))}
        </Box>
      </StyledRecentChatsContainer>
      {openChat && <Chat setOpen={setOpenChat} />}
    </StyledChatsWrapper>
  );
}

export default RecentChats;
