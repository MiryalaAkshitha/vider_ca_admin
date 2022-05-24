import { Avatar, Box, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const ChatMessages = () => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  let [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const socket = io(`http://localhost:5000`);
    socket.on("message", (message) => {
      setMessages((messages: any[]) => [...messages, message]);
    });
  }, []);

  useEffect(() => {
    if (!elementRef.current) return;
    const config = { childList: true, subtree: true };

    let elementScrollHeight = elementRef.current.scrollHeight;
    elementRef.current.scrollTo({
      top: elementScrollHeight,
      behavior: "smooth",
    });

    const callback = (mutationList: MutationRecord[]) => {
      for (const mutation of mutationList) {
        if (
          mutation.type === "childList" ||
          mutation.type === "characterData"
        ) {
          elementScrollHeight = elementRef!.current!.scrollHeight;
          elementRef!.current!.scrollTo({
            top: elementScrollHeight,
          });
        }
      }
    };

    const observer = new MutationObserver(callback);

    observer.observe(elementRef.current, config);
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Box ref={elementRef} sx={{ flex: 1, overflowY: "auto", px: 1, py: 2 }}>
      {messages.map((message) => {
        if (message.type === "outgoing") {
          return <OutgoingMessage data={message} />;
        }
        return <IncomingMessage data={message} />;
      })}
    </Box>
  );
};

const IncomingMessage = ({ data }) => {
  return (
    <Box display="flex" gap={1} flex={1} mb={2}>
      <Avatar
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: 30, height: 30 }}
      />
      <Box
        sx={{
          background: "#F5F5F5",
          p: 1,
          borderRadius: 2,
          borderTopLeftRadius: 0,
        }}
      >
        <Typography color="rgba(0,0,0,0.8)" variant="caption">
          {data?.message}
        </Typography>
      </Box>
    </Box>
  );
};

const OutgoingMessage = ({ data }) => {
  return (
    <Box display="flex" justifyContent="flex-end" gap={1} flex={1} mb={2}>
      <Box
        sx={{
          background: "#D9FFEB",
          p: 1,
          borderRadius: 2,
          borderTopRightRadius: 0,
        }}
      >
        <Typography color="rgba(0,0,0,0.8)" variant="caption">
          {data?.message}
        </Typography>
      </Box>
      <Avatar
        src="https://mui.com/static/images/avatar/1.jpg"
        sx={{ width: 30, height: 30 }}
      />
    </Box>
  );
};

export default ChatMessages;
