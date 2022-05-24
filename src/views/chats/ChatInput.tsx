import AttachmentRoundedIcon from "@mui/icons-material/AttachmentRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { IconButton } from "@mui/material";
import { useState } from "react";
import io from "socket.io-client";
import { SubmitType } from "types";
import { StyledChatInput } from "./styles";

const socket = io("http://localhost:5000");

function ChatInput() {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    if (!message) return;
    socket.emit("message", { message });
    setMessage("");
  };

  return (
    <StyledChatInput>
      <form onSubmit={handleSubmit}>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          autoFocus
          type="text"
          placeholder="Type a message..."
        />
        <div>
          <IconButton size="small" color="secondary">
            <AttachmentRoundedIcon />
          </IconButton>
          <IconButton type="submit" size="small" color="secondary">
            <SendRoundedIcon />
          </IconButton>
        </div>
      </form>
    </StyledChatInput>
  );
}

export default ChatInput;
