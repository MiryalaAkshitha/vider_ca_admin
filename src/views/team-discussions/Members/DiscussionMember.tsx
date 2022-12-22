import React from 'react'
 import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { Box, Divider, IconButton, List, Typography } from "@mui/material";
import { createRoom } from "api/services/chats";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setChatData, setChatType } from "redux/reducers/chatsSlice";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import Chat from "../../chats/Chat";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';

import {
  StyledChatHeader,
  StyledChatSearch,
  StyledChatsWrapper,
  StyledRecentChatsContainer,
} from "../../chats/styles";
import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
// import DiscussionMember from "./DiscussionMembers";

function DiscussionMember({ data, selected, onClick }: any) {
  return (
    <ListItemButton
      selected={selected}
      sx={{
        position: "relative",
        ...(selected && {
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "2px",
            background: "#2196f3",
            borderRadius: "2px",
          },
        }),
      }}
      onClick={() => onClick(data)}
    >
      <ListItemAvatar>
        <Avatar src={data?.imageUrl || ""} />
      </ListItemAvatar>
      <ListItemText primary={data?.fullName} />
    </ListItemButton>
  );
}
function Members() {
  const dispatch = useDispatch();
const [open, setOpen] = React.useState(true);
 const userId = localStorage.getItem("userId") || "";
  const [openChat, setOpenChat] = useState(false);
  const [selected, setSelected] = useState<any>(null);
  const [search, setSearch] = useState("");

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
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleClick = (data: any) => {
    setOpen(!open)
  };

  const filtered = () => {
    if (search) {
      return data?.data?.filter((item: any) => {
        return item?.fullName?.toLowerCase().includes(search.toLowerCase());
      });
    }
    return data?.data;
  };

  return (
    <div>
     <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
                  {open ? <ArrowDropDownIcon/> : <ArrowRightIcon />}

        Members  
        </ListItemButton>
        {/* <Button variant="contained" onClick={() => DiscussionsAddGroup}>+ click</Button> */}
       <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
          {isLoading ? (
            <Loader />
          ) : (
            <List>
               {filtered()?.map((item: any, index: number) => {
                if (item.id === parseInt(userId)) return null;
                return (
                  <>
                    <DiscussionMember
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
          {!isLoading && data?.data?.length === 0 && (
            <Box textAlign="center" mt={4}>
              <Typography variant="body1">No groups yet</Typography>
              </Box>
          )}
      
</List>
      </Collapse>
      </List>
      </div>
  );
}

export default Members;








{/* {filtered()?.map((item: any, index: number) => {
                if (item.id === parseInt(userId)) return null;
                return (
                  <>
                    <DiscussionMember
                      onClick={() => handleClick(item)}
                      selected={selected?.id === item?.id}
                      data={item}
                      key={index}
                    />
                    {index !== data?.data?.length - 1 && <Divider />}
                  </>
                );
              })}     */}