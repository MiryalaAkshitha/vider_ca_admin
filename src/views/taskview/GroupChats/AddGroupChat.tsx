import { Autocomplete, Button, TextField } from "@mui/material";
import { createGroup } from "api/services/chats";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";

interface Props extends DialogProps {
  taskData: any;
}

function AddGroupChat({ open, setOpen, taskData }: Props) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<any>({
    name: "",
    members: [],
  });

  const { data: users, isLoading }: ResType = useQuery("users", getUsers, {
    enabled: open,
  });

  useEffect(() => {
    setState((state: any) => ({
      name: taskData?.name,
      members: taskData?.members,
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
      {isLoading ? (
        <Loader />
      ) : (
        <>
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
            value={state?.members}
            onChange={(_, value) => {
              setState({ ...state, members: value });
            }}
            options={users?.data || []}
            isOptionEqualToValue={(option, value) => option.id === value.id}
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
        </>
      )}
    </DrawerWrapper>
  );
}

export default AddGroupChat;
