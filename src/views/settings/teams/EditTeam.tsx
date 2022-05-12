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
import { getUsers, updateTeam } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { DialogProps, ResType, SubmitType } from "types";
import { StyledChecklistContainer } from "views/taskboard/taskview/Milestones/styled";

type State = {
  name: string;
  tags: any[];
  members: any[];
};

interface IProps extends DialogProps {
  selectedTeam: any;
}

function EditTeam({ open, setOpen, selectedTeam }: IProps) {
  const queryClient = useQueryClient();

  const [state, setState] = useState<State>({
    name: "",
    tags: [],
    members: [],
  });

  const { data: labels, isLoading: labelsLoading }: ResType = useQuery(
    "labels",
    getLabels,
    { enabled: open }
  );

  const { data: users, isLoading: usersLoading }: ResType = useQuery(
    "users",
    getUsers
  );

  useEffect(() => {
    setState({
      ...selectedTeam,
      members: selectedTeam.members.map((tag: any) => tag.id),
    });
  }, [selectedTeam]);

  const { mutate, isLoading } = useMutation(updateTeam, {
    onSuccess: () => {
      snack.success("Team updated");
      setOpen(false);
      queryClient.invalidateQueries("teams");
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
    mutate({
      id: selectedTeam.id,
      data: state,
    });
  };

  return (
    <DrawerWrapper title="Edit Team" open={open} setOpen={setOpen}>
      {labelsLoading || usersLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            fullWidth
            size="small"
            value={state.name}
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
                      <Avatar src="https://i.pravatar.cc/100" />
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
              title="Update Team"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default EditTeam;
