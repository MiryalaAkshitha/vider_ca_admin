import { DeleteOutlined, EditOutlined } from "@mui/icons-material";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import { deleteChatroom } from "api/services/chats";
import Members from "components/Members";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { setChatData, setChatType } from "redux/reducers/chatsSlice";
import EditGroupChat from "./EditGroupChat";

function GroupChat({ chat, taskData, setGroupChats }) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(deleteChatroom, {
    onSuccess: () => {
      queryClient.invalidateQueries("task-group-chats");
      snack.success("Group chat deleted");
    },
  });

  const handleClick = () => {
    dispatch(setChatType("chat"));
    dispatch(setChatData(chat));
    setGroupChats(false);
  };

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this group chat?",
      action: () => mutate({ id: chat.id }),
    });
  };

  return (
    <>
      <Box sx={{ cursor: "pointer" }}>
        <Box display="flex" p={1} justifyContent="space-between" gap={2}>
          <Box>
            <Typography onClick={handleClick} variant="h6">
              {chat.name}
            </Typography>
            <Typography
              gutterBottom
              variant="caption"
              sx={{ display: "block" }}
            >
              {chat?.members?.length} Participants
            </Typography>
            <Members
              data={chat?.members?.map((item: any) => ({
                title: item.fullName,
                src: item?.imageUrl,
              }))}
            />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-between"
          >
            <Box
              display="flex"
              gap={1}
              justifyContent="flex-end"
              alignItems="center"
            >
              <IconButton size="small" onClick={() => setOpen(true)}>
                <EditOutlined color="primary" fontSize="small" />
              </IconButton>
              <IconButton onClick={handleDelete} size="small">
                <DeleteOutlined color="primary" fontSize="small" />
              </IconButton>
            </Box>
            <Typography variant="caption">
              Created on {moment(chat?.createdAt).format("MMM DD, YYYY")}
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mx: -2 }} />
      </Box>
      <EditGroupChat open={open} setOpen={setOpen} groupChatData={chat} />
    </>
  );
}

export default GroupChat;
