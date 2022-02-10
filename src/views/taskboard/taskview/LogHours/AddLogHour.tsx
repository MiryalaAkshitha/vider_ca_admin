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
  completedDate: string;
  hours: string;
  minutes: string;
}

function AddLogHour({ open, setOpen }: DialogProps) {
  const params = useParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<StateProps>({
    users: [],
    completedDate: "",
    hours: "00",
    minutes: "00",
  });

  const { data, isLoading }: ResType = useQuery("users", getUsers, {
    enabled: open,
  });

  const { mutate, isLoading: createLoading } = useMutation(addLogHour, {
    onSuccess: () => {
      snack.success("Log Hour Added");
      setOpen(false);
      setState({
        users: [],
        completedDate: "",
        hours: "00",
        minutes: "00",
      });
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
    if (state.hours === "00" && state.minutes === "00") {
      snack.error("Please enter duration");
      return;
    }
    const { hours, minutes, ...apiData } = {
      ...state,
      duration: moment
        .duration(`${state.hours}:${state.minutes}`)
        .asMilliseconds(),
    };
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
            value={state.completedDate}
            name="completedDate"
            type="date"
            label="Date"
            InputLabelProps={{ shrink: true }}
            required
          />
          <Box sx={{ mt: 3, display: "flex", gap: 1 }}>
            <Autocomplete
              value={state.hours}
              disableClearable
              sx={{ minWidth: 100 }}
              onChange={(_, value) => {
                setState({ ...state, hours: value });
              }}
              size="small"
              options={Array.from(Array(24).keys()).map((_, index) =>
                index <= 9 ? `0${index}` : index?.toString()
              )}
              renderInput={(params) => <TextField {...params} label="Hours" />}
            />
            <Autocomplete
              value={state.minutes}
              size="small"
              disableClearable
              onChange={(_, value) => {
                setState({ ...state, minutes: value });
              }}
              sx={{ minWidth: 100 }}
              options={Array.from(Array(60).keys()).map((_, index) =>
                index <= 9 ? `0${index}` : index?.toString()
              )}
              renderInput={(params) => (
                <TextField {...params} label="Minutes" />
              )}
            />
          </Box>
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
