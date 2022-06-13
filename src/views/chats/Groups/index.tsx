import { AddSharp } from "@mui/icons-material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import {
  Box,
  Button,
  Divider,
  Fab,
  IconButton,
  List,
  Typography,
} from "@mui/material";
import { getChatRooms } from "api/services/chats";
import Loader from "components/Loader";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setChatData, setChatType } from "redux/reducers/chatsSlice";
import { ResType } from "types";
import Chat from "../Chat";
import ChatItem from "../RecentChats/ChatItem";
import {
  StyledChatHeader,
  StyledChatSearch,
  StyledChatsWrapper,
  StyledRecentChatsContainer,
} from "../styles";
import AddGroup from "./AddGroup";

function Groups() {
  const dispatch = useDispatch();
  const [openAddGroup, setOpenAddGroup] = useState(false);
  const [openChat, setOpenChat] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const { data, isLoading }: ResType = useQuery(
    ["group-chats", "GROUP"],
    getChatRooms,
    {
      refetchInterval: 3000,
    }
  );

  const handleClose = () => {
    dispatch(setChatType(""));
    document.body.style.overflow = "auto";
  };

  const handleClick = (data: any) => {
    setSelected(data);
    setOpenChat(true);
    dispatch(
      setChatData({
        name: data?.name,
        image: "",
        type: "GROUP",
        members: data?.members,
        roomId: data?.roomId,
        messages: data?.messages,
      })
    );
  };

  return (
    <StyledChatsWrapper>
      <StyledRecentChatsContainer>
        <StyledChatHeader>
          <Typography variant="body1">Groups</Typography>
          <Box>
            <IconButton size="small" onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </StyledChatHeader>
        <Box>
          <StyledChatSearch type="text" placeholder="Search for a group" />
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {isLoading ? (
            <Loader />
          ) : (
            <List>
              {data?.data?.map((item: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <ChatItem
                      selected={selected?.id === item?.id}
                      onClick={handleClick}
                      data={item}
                    />
                    {index !== data?.data?.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </List>
          )}
          {!isLoading && data?.data?.length === 0 && (
            <Box textAlign="center" mt={4}>
              <Typography variant="body1">No groups yet</Typography>
              <Button
                onClick={() => setOpenAddGroup(true)}
                size="small"
                color="secondary"
                variant="contained"
                sx={{ mt: 1 }}
              >
                + Add Group
              </Button>
            </Box>
          )}
        </Box>
        {data?.data?.length > 0 && (
          <Fab
            onClick={() => setOpenAddGroup(true)}
            size="small"
            color="primary"
            sx={{ position: "absolute", bottom: 10, right: 10 }}
          >
            <AddSharp />
          </Fab>
        )}
      </StyledRecentChatsContainer>
      {openChat && (
        <Chat
          onClose={() => {
            setOpenChat(false);
            setSelected(null);
          }}
        />
      )}
      <AddGroup open={openAddGroup} setOpen={setOpenAddGroup} />
    </StyledChatsWrapper>
  );
}

export default Groups;
