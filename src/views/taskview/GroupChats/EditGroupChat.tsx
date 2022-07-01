import { Autocomplete, Button, TextField } from "@mui/material";
import { updateChatRoom } from "api/services/chats";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";

interface Props extends DialogProps {
  groupChatData: any;
}

function EditGroupChat({ open, setOpen, groupChatData }: Props) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<any>({
    name: "",
    members: [],
  });

  const { data: users, isLoading }: ResType = useQuery("users", getUsers, {
    enabled: open,
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
            Update Group Chat
          </Button>
        </>
      )}
    </DrawerWrapper>
  );
}

export default EditGroupChat;
