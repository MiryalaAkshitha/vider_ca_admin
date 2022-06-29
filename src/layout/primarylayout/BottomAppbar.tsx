import ChatIcon from "@mui/icons-material/Chat";
import PeopleIcon from "@mui/icons-material/People";
import WorkspacesIcon from "@mui/icons-material/Workspaces";
import { Button } from "@mui/material";
import { socket } from "app";
import { StyledBottomAppbar } from "layout/styles";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectChats, setChatType } from "redux/reducers/chatsSlice";
import Chat from "views/chats/Chat";
import Groups from "views/chats/Groups";
import Members from "views/chats/Members";
import RecentChats from "views/chats/RecentChats";
import { StyledChatsWrapper } from "views/chats/styles";

function BottomAppbar() {
  const dispatch = useDispatch();
  const { chatType } = useSelector(selectChats);

  const handleClick = (type: string) => {
    dispatch(setChatType(type));
    document.body.style.overflow = chatType ? "auto" : "hidden";
  };

  const activeStyle = (type: string) => {
    let isActive = chatType === type;
    return {
      background: isActive ? "rgba(0,0,0,0.08)" : "",
    };
  };

  useEffect(() => {
    let userId = localStorage.getItem("userId") || "";
    socket.on(userId + "-unread", (message) => {
      console.log(message);
    });
    return () => {
      socket.off(userId + "-unread");
    };
  }, []);

  return (
    <StyledBottomAppbar>
      <Button
        sx={activeStyle("recent")}
        onClick={() => handleClick("recent")}
        size="small"
        startIcon={<ChatIcon fontSize="small" />}
      >
        Chats
      </Button>
      <Button
        onClick={() => handleClick("groups")}
        sx={activeStyle("groups")}
        size="small"
        startIcon={<WorkspacesIcon fontSize="small" />}
      >
        Groups
      </Button>
      <Button
        onClick={() => handleClick("members")}
        sx={activeStyle("members")}
        size="small"
        startIcon={<PeopleIcon fontSize="small" />}
      >
        Members
      </Button>
      {chatType === "recent" && <RecentChats />}
      {chatType === "groups" && <Groups />}
      {chatType === "members" && <Members />}
      {chatType === "chat" && (
        <StyledChatsWrapper>
          <Chat
            onClose={() => {
              dispatch(setChatType(""));
            }}
          />
        </StyledChatsWrapper>
      )}
    </StyledBottomAppbar>
  );
}

export default BottomAppbar;
