import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ZoomOutMapRoundedIcon from "@mui/icons-material/ZoomOutMapRounded";
import { Box, IconButton, Typography } from "@mui/material";
import { readMessages } from "api/services/chats";
import { socket } from "app";
import Members from "components/Members";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, selectChats } from "redux/reducers/chatsSlice";
import { StyledChatHeader, StyledRecentChatsContainer } from "../styles";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";

interface Props {
  onClose?: () => void;
}

function Chat({ onClose }: Props) {
  const { name, roomId, members, type } = useSelector(selectChats);
  const dispatch = useDispatch();
  const [maximize, setMaximize] = useState(false);
  const [typing, setTyping] = useState(false);

  const handleClose = () => {
    onClose && onClose();
  };

  useQuery(["read-messages", roomId], readMessages, {
    refetchInterval: 3000,
  });

  useEffect(() => {
    if (!roomId) return;
    socket.on(`${roomId}/typing`, (message: any) => {
      if (message.userId === localStorage.getItem("userId")) return;
      setTyping(message?.typing || false);
    });
    return () => {
      socket.off(roomId);
    };
  }, [roomId]);

  useEffect(() => {
    if (!roomId) return;
    socket.on(roomId, (message: any) => {
      dispatch(addMessage(message));
    });
    return () => {
      socket.off(roomId);
    };
  }, [roomId, dispatch]);

  return (
    <StyledRecentChatsContainer
      sx={{
        ...(maximize && {
          width: 500,
          height: 500,
        }),
      }}
    >
      <StyledChatHeader
        sx={{
          boxShadow: "0px -1px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box>
          <Typography flex={1} variant="body1">
            {name} {typing && " - typing..."}
          </Typography>
          {type === "GROUP" && (
            <Box display="flex" alignItems="center" gap="4px">
              <Members
                size="small"
                data={members?.map((item) => ({
                  title: item?.fullName,
                  src: item?.imageUrl,
                }))}
              />
              <Typography
                variant="caption"
                sx={{ display: "block", fontSize: 10 }}
              >
                ({members?.length} participants)
              </Typography>
            </Box>
          )}
        </Box>
        <Box display="flex" gap={1}>
          <IconButton
            size="small"
            onClick={() => {
              setMaximize(!maximize);
            }}
          >
            <ZoomOutMapRoundedIcon fontSize="small" />
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
