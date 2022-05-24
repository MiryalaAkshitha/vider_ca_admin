import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { Box, IconButton, Typography } from "@mui/material";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { StyledChatHeader, StyledRecentChatsContainer } from "./styles";

interface Props {
  setOpen: (open: boolean) => void;
}

function Chat({ setOpen }: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <StyledRecentChatsContainer>
      <StyledChatHeader
        sx={{
          boxShadow: "0px -1px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="body1">Vinay Kumar</Typography>
        <Box>
          <IconButton size="small" onClick={handleClose}>
            <RemoveRoundedIcon />
          </IconButton>
          <IconButton size="small" onClick={handleClose}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>
      </StyledChatHeader>
      <ChatMessages />
      <ChatInput />
    </StyledRecentChatsContainer>
  );
}

export default Chat;
