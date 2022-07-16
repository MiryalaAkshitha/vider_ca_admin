import AttachmentRoundedIcon from "@mui/icons-material/AttachmentRounded";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import { Box, CircularProgress, IconButton } from "@mui/material";
import { http } from "api/http";
import { socket } from "app";
import _ from "lodash";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectChats } from "redux/reducers/chatsSlice";
import { SubmitType } from "types";
import { StyledChatInput } from "../styles";

let timeout: any;

function ChatInput() {
  const userId = localStorage.getItem("userId") || "";
  const [message, setMessage] = useState("");
  const { roomId } = useSelector(selectChats);
  const inputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let file = e.target.files?.[0];

    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    const res: any = await http.post("/common/upload", formData);
    socket.emit("message", {
      message,
      file: res.data.Location,
      fileType: file.type,
      fileName: file.name,
      roomId,
      senderId: +userId,
    });
    setLoading(false);
  };

  const onMessageChange = (e: any) => {
    setMessage(e.target.value);
    socket.emit("typing", {
      roomId,
      userId,
      typing: true,
    });
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      socket.emit("typing", {
        roomId,
        userId,
        typing: false,
      });
    }, 1000);
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    if (!message) return;
    if (!roomId) return;
    socket.emit("message", { message, roomId, senderId: +userId });
    setMessage("");
  };

  return (
    <>
      <StyledChatInput>
        <form onSubmit={handleSubmit}>
          <input
            value={message}
            onChange={onMessageChange}
            autoFocus
            type="text"
            placeholder="Type a message..."
          />
          <div>
            <IconButton
              onClick={() => inputRef.current?.click()}
              size="small"
              color="secondary"
            >
              <AttachmentRoundedIcon />
            </IconButton>
            <IconButton type="submit" size="small" color="secondary">
              <SendRoundedIcon />
            </IconButton>
          </div>
        </form>
        <input
          onChange={handleChange}
          ref={inputRef}
          type="file"
          style={{ display: "none" }}
        />
      </StyledChatInput>
      {loading && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}
    </>
  );
}

export default ChatInput;
