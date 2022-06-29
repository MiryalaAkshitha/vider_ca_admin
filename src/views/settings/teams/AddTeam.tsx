import {
  Autocomplete,
  Avatar,
  Checkbox,
  Chip,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getLabels } from "api/services/labels";
import { createTeam, getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType, SubmitType } from "types";
import { StyledChecklistContainer } from "views/taskboard/taskview/Milestones/styled";

type State = {
  name: string;
  tags: any[];
  members: any[];
};

let initialState = {
  name: "",
  tags: [],
  members: [],
};

function AddTeam({ open, setOpen }: DialogProps) {
  const queryClient = useQueryClient();
  const [state, setState] = useState<State>(_.cloneDeep(initialState));

  const { data: labels, isLoading: labelsLoading }: ResType = useQuery(
    "labels",
    getLabels,
    { enabled: open }
  );

  const { data: users, isLoading: usersLoading }: ResType = useQuery(
    "users",
    getUsers
  );

  const { mutate, isLoading } = useMutation(createTeam, {
    onSuccess: () => {
      setState(_.cloneDeep(initialState));
      queryClient.invalidateQueries("teams");
      snack.success("Team Created");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleMembersChange = (e: any, user) => {
    if (e.target.checked) {
      setState({
        ...state,
        members: [...state.members, user?.id],
      });
    } else {
      setState({
        ...state,
        members: state.members.filter((id) => id !== user?.id),
      });
    }
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    if (!state.members.length) {
      snack.error("Please select at least one member");
      return;
    }
    mutate(state);
  };

  return (
    <DrawerWrapper title="Create New Team" open={open} setOpen={setOpen}>
      {labelsLoading || usersLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            value={state.name}
            size="small"
            required
            label="Team Name"
            name="name"
            onChange={(e) => {
              setState({ ...state, name: e.target.value });
            }}
          />
          <StyledChecklistContainer>
            <header>
              <Typography variant="body1" color="rgba(0,0,0,0.6)">
                Select members
              </Typography>
            </header>
            <main>
              {users?.data.map((user: any, index: number) => (
                <FormControlLabel
                  key={index}
                  sx={{
                    marginLeft: 0,
                    mb: 2,
                    width: "100%",
                    justifyContent: "space-between",
                  }}
                  labelPlacement="start"
                  label={
                    <Box display="flex" gap={1} flex={1} alignItems="center">
                      <Avatar src={user?.imageUrl} />
                      <Typography sx={{ flex: 1 }}>{user?.fullName}</Typography>
                    </Box>
                  }
                  control={
                    <Checkbox
                      checked={state.members.includes(user?.id)}
                      onChange={(e) => handleMembersChange(e, user)}
                    />
                  }
                />
              ))}
            </main>
          </StyledChecklistContainer>
          <Autocomplete
            multiple
            size="small"
            freeSolo
            sx={{ mt: 3 }}
            value={state?.tags || []}
            renderTags={(value, getTagProps) => {
              return value.map((option, index) => (
                <Chip label={option} {...getTagProps({ index })} />
              ));
            }}
            onChange={(_, value) => {
              setState({ ...state, tags: value });
            }}
            options={labels?.data?.map((item: any) => item?.name) || []}
            renderInput={(params) => <TextField label="Tags" {...params} />}
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Create Team"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddTeam;
