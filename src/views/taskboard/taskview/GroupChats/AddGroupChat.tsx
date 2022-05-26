import { Autocomplete, Button, TextField } from "@mui/material";
import { createGroup } from "api/services/chats";
import DrawerWrapper from "components/DrawerWrapper";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface Props extends DialogProps {
  taskData: any;
}

function AddGroupChat({ open, setOpen, taskData }: Props) {
  let userId = localStorage.getItem("userId") || "";
  const queryClient = useQueryClient();
  const [state, setState] = useState<any>({
    name: "",
    members: [],
  });

  useEffect(() => {
    setState((state: any) => ({
      ...state,
      name: taskData?.name,
    }));
  }, [taskData]);

  const { mutate } = useMutation(createGroup, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries("task-group-chats");
      snack.success("Group chat created");
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
      name: state.name,
      taskId: taskData?.id,
      members: state.members?.map((member: any) => member.id),
    });
  };

  return (
    <DrawerWrapper title="Create group chat" open={open} setOpen={setOpen}>
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
        options={
          taskData?.members?.filter((item: any) => item?.id !== +userId) || []
        }
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
        Create Group Chat
      </Button>
    </DrawerWrapper>
  );
}

export default AddGroupChat;
