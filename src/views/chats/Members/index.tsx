import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { createRoom } from "api/services/chats";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
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
import Member from "./Member";

function Members() {
  const dispatch = useDispatch();
  const userId = localStorage.getItem("userId") || "";
  const [openChat, setOpenChat] = useState(false);
  const [selected, setSelected] = useState<any>(null);

  const { data, isLoading }: ResType = useQuery("users", getUsers);

  const handleClose = () => {
    dispatch(setChatType(""));
    document.body.style.overflow = "auto";
  };

  const { mutate } = useMutation(createRoom, {
    onSuccess: (res: any, variables) => {
      dispatch(
        setChatData({
          name: variables?.name,
          image: variables?.image,
          type: "INDIVIDUAL",
          members: res?.data?.members,
          roomId: res.data?.roomId,
          messages: res?.data?.messages,
        })
      );
      setOpenChat(true);
    },
  });

  const handleClick = (data: any) => {
    mutate({
      name: data?.fullName,
      image: data?.imageUrl,
      members: [data?.id, +userId],
    });
  };

  return (
    <StyledChatsWrapper>
      <StyledRecentChatsContainer>
        <StyledChatHeader>
          <Typography variant="body1">Members</Typography>
          <Box>
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
          {isLoading ? (
            <Loader />
          ) : (
            <List>
              {data?.data?.map((item: any, index: number) => {
                if (item.id === parseInt(userId)) return null;
                return (
                  <>
                    <Member
                      onClick={() => handleClick(item)}
                      selected={selected?.id === item?.id}
                      data={item}
                      key={index}
                    />
                    {index !== data?.data?.length - 1 && <Divider />}
                  </>
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

export default Members;
