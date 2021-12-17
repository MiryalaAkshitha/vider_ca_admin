import { Autocomplete, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { addLogHour } from "api/services/tasks";
import { getUsers } from "api/services/users";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { DialogProps, ResType, SubmitType } from "types";

interface StateProps {
  users: any[];
  date: string;
  duration: string;
}

function AddLogHour({ open, setOpen }: DialogProps) {
  const params = useParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>({
    users: [],
    date: "",
    duration: "",
  });

  const { data, isLoading }: ResType = useQuery("users", getUsers, {
    enabled: open,
  });

  const { mutate, isLoading: createLoading } = useMutation(addLogHour, {
    onSuccess: () => {
      snack.success("Log Hour Added");
      setOpen(false);
      queryClient.invalidateQueries("loghours");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (e: any) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    if (!state.users.length) {
      snack.error("Please select atleast one user");
      return;
    }
    if (!state.duration.match(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)) {
      snack.error("Please enter duration in HH:MM format");
      return;
    }
    let apiData: any = { ...state };
    apiData.duration = moment.duration(apiData.duration).asMilliseconds();

    mutate({
      taskId: params.taskId,
      data: apiData,
    });
  };

  return (
    <DrawerWrapper open={open} title="Add Log Hour" setOpen={setOpen}>
      {isLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <Autocomplete
            multiple
            id="tags-standard"
            onChange={(_, value) => {
              setState({ ...state, users: value });
            }}
            value={state.users || []}
            options={data?.data || []}
            getOptionLabel={(option: any) => {
              return option?.firstName + " " + option?.lastName;
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="Users"
              />
            )}
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            name="date"
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            required
          />
          <TextField
            sx={{ mt: 3 }}
            variant="outlined"
            fullWidth
            onChange={handleChange}
            size="small"
            label="Duration (HH:MM)"
            value={state.duration}
            name="duration"
            required
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={createLoading}
              fullWidth
              loadingColor="white"
              title="Add Log Hour"
              color="secondary"
              type="submit"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddLogHour;
