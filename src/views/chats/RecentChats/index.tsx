import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { getChatRooms } from "api/services/chats";
import Loader from "components/Loader";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setChatData, setChatType } from "redux/reducers/chatsSlice";
import { ResType } from "types";
import Chat from "../Chat";
import {
  StyledChatHeader,
  StyledChatSearch,
  StyledChatsWrapper,
  StyledRecentChatsContainer,
} from "../styles";
import ChatItem from "./ChatItem";

function RecentChats() {
  const userId = localStorage.getItem("userId") || "";
  const dispatch = useDispatch();
  const [openChat, setOpenChat] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");

  const { data, isLoading }: ResType = useQuery(
    ["chats", "INDIVIDUAL"],
    getChatRooms,
    {
      refetchInterval: 3000,
    }
  );

  let mapped = data?.data?.map((item: any) => {
    let user = item?.members.find((member: any) => member.id !== +userId);
    return {
      ...item,
      name: user?.fullName,
      image: user?.imageUrl,
    };
  });

  const filtered = () => {
    if (search) {
      return mapped?.filter((item: any) => {
        return item?.name?.toLowerCase().includes(search.toLowerCase());
      });
    }
    return mapped;
  };

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
        image: data?.image,
        type: "INDIVIDUAL",
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
          <Typography variant="body1">Chats</Typography>
          <Box>
            <IconButton size="small" onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
        </StyledChatHeader>
        <Box>
          <StyledChatSearch
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            type="text"
            placeholder="Search for a chat"
          />
        </Box>
        <Box sx={{ flex: 1, overflowY: "auto" }}>
          {isLoading ? (
            <Loader />
          ) : (
            <List>
              {filtered()?.map((item: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <ChatItem
                      selected={selected?.id === item?.id}
                      onClick={handleClick}
                      data={item}
                    />
                    {index !== mapped?.length - 1 && <Divider />}
                  </React.Fragment>
                );
              })}
            </List>
          )}
        </Box>
      </StyledRecentChatsContainer>
      {openChat && (
        <Chat
          onClose={() => {
            setOpenChat(false);
            setSelected(null);
          }}
        />
      )}
    </StyledChatsWrapper>
  );
}

export default RecentChats;
