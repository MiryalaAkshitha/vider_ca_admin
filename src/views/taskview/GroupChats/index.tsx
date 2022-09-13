import { Box, Button, Divider, Typography } from "@mui/material";
import { getChatRooms } from "api/services/chats";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { DialogProps, ResType } from "types";
import AddGroupChat from "./AddGroupChat";
import GroupChat from "./GroupChat";

interface Props extends DialogProps {
  taskData: any;
}

function GroupChats({ open, setOpen, taskData }: Props) {
  const [openAddGroupChat, setOpenAddGroupChat] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["task-group-chats", "GROUP", taskData?.id],
    getChatRooms,
    {
      refetchInterval: 3000,
      enabled: open,
    }
  );

  return (
    <DrawerWrapper title="Group Chats" open={open} setOpen={setOpen}>
      <Box display="flex" alignItems="center" justifyContent="space-between" >
        <Typography variant="subtitle2">
          {data?.data?.length || "No"} Group Chat(s)
        </Typography>
        <Button onClick={() => setOpenAddGroupChat(true)} color="secondary">
          + Add group chat
        </Button>
      </Box>
      <Divider sx={{ mx: -2, mt: 2 }} />
      <Box>
      {isLoading ? (
          <Loader />
        ) : (
          data?.data?.map((chat: any, index: number) => (
            <GroupChat setGroupChats={setOpen} key={index} chat={chat} />
          ))
        )}
      </Box>
      <AddGroupChat
        open={openAddGroupChat}
        setOpen={setOpenAddGroupChat}
        taskData={taskData}
      />
    </DrawerWrapper>
  );
}

export default GroupChats;
