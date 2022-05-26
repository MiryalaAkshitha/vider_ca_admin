import { Autocomplete, Button, TextField } from "@mui/material";
import { updateChatRoom } from "api/services/chats";
import DrawerWrapper from "components/DrawerWrapper";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface Props extends DialogProps {
  taskData: any;
  groupChatData: any;
}

function EditGroupChat({ open, setOpen, taskData, groupChatData }: Props) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<any>({
    name: "",
    members: [],
  });

  useEffect(() => {
    setState({
      name: groupChatData?.name,
      members: groupChatData?.members,
    });
  }, [groupChatData]);

  const { mutate } = useMutation(updateChatRoom, {
    onSuccess: () => {
      queryClient.invalidateQueries("task-group-chats");
      setOpen(false);
    },
  });

  const handleSubmit = () => {
    if (!state.name) {
      return snack.error("Group name is required");
    }

    if (!state.members.length) {
      return snack.error("Select atleast one member");
    }

    mutate({
      id: groupChatData?.id,
      data: {
        name: state.name,
        members: state.members?.map((member: any) => member.id),
      },
    });
  };

  return (
    <DrawerWrapper title="Edit group chat" open={open} setOpen={setOpen}>
      <TextField
        onChange={(e) => setState({ ...state, name: e.target.value })}
        fullWidth
        label="Name"
        value={state.name}
        variant="outlined"
        size="small"
      />
      <Autocomplete
        size="small"
        sx={{ mt: 2 }}
        multiple
        disablePortal
        value={state.members}
        onChange={(_, value) => {
          setState({ ...state, members: value });
        }}
        options={taskData?.members || []}
        getOptionLabel={(option: any) => option.fullName}
        renderInput={(params) => (
          <TextField {...params} label="Members" variant="outlined" />
        )}
      />
      <Button
        sx={{ mt: 2 }}
        variant="contained"
        color="secondary"
        fullWidth
        onClick={handleSubmit}
      >
        Update Group Chat
      </Button>
    </DrawerWrapper>
  );
}

export default EditGroupChat;
