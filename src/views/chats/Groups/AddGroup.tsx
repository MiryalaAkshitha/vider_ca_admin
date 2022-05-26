import { Autocomplete, Button, TextField } from "@mui/material";
import { createGroup } from "api/services/chats";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType } from "types";

function AddGroup({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<any>({
    name: "",
    members: [],
  });

  const { data }: ResType = useQuery("users", getUsers, {
    enabled: open,
  });

  const { mutate } = useMutation(createGroup, {
    onSuccess: (res: any) => {
      queryClient.invalidateQueries("group-chats");
      snack.success("Group created");
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
      members: state.members?.map((member: any) => member.id),
    });
  };

  return (
    <DrawerWrapper title="Create Group" open={open} setOpen={setOpen}>
      <TextField
        onChange={(e) => setState({ ...state, name: e.target.value })}
        fullWidth
        label="Name"
        variant="outlined"
        size="small"
      />
      <Autocomplete
        size="small"
        sx={{ mt: 2 }}
        multiple
        disablePortal
        onChange={(_, value) => {
          setState({ ...state, members: value });
        }}
        options={data?.data || []}
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
        Create Group
      </Button>
    </DrawerWrapper>
  );
}

export default AddGroup;
