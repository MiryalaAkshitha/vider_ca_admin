import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { getClients } from "api/services/client";
import { createEvent } from "api/services/events";
import { getTasks } from "api/services/tasks";
import DrawerWrapper from "components/DrawerWrapper";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useQueryParams from "hooks/useQueryParams";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { InputChangeType, ResType, SubmitType } from "types";
import { getTitle } from "utils";
import { Reminders } from "utils/constants";

interface IState {
  title: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  reminder: string | null;
  reminderNotes: string | null;
  client: number | null;
  task: any;
  members: Array<any>;
}

function AddEvent() {
  const { queryParams, setQueryParams } = useQueryParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [reminderChecked, setReminderChecked] = useState<boolean>(false);
  const [state, setState] = useState<IState>({
    title: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    reminder: null,
    reminderNotes: null,
    client: null,
    task: null,
    members: [],
  });

  const { data: clients, isLoading: clientsLoading }: ResType = useQuery(
    ["clients", {}],
    getClients,
    {
      enabled: queryParams.createEvent === "true",
    }
  );

  const { data: tasks, isLoading: tasksLoading }: ResType = useQuery(
    ["tasks", {}],
    getTasks,
    {
      enabled: queryParams.createEvent === "true",
    }
  );

  const { mutate, isLoading: createLoading } = useMutation(createEvent, {
    onSuccess: () => {
      snack.success("Event Created");
      delete queryParams.createEvent;
      setQueryParams({ ...queryParams });
      queryClient.invalidateQueries("events");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleChange = (event: InputChangeType) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({
      ...state,
      task: state.task?.id,
    });
  };

  return (
    <DrawerWrapper
      open={queryParams.createEvent === "true"}
      setOpen={() => {
        delete queryParams.createEvent;
        setQueryParams({ ...queryParams });
      }}
      title="Create an Event"
    >
      {clientsLoading || tasksLoading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit}>
          <Autocomplete
            id="tags-standard"
            onChange={(_, value) => {
              setState({ ...state, client: value?.id, task: null });
            }}
            options={clients?.data[0] || []}
            getOptionLabel={(option: any) => option?.displayName}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                size="small"
                fullWidth
                label="Select Client"
                required
              />
            )}
          />
          {state.client && (
            <Autocomplete
              id="tags-standard"
              sx={{ mt: 3 }}
              onChange={(_, value) => {
                setState({ ...state, task: value, members: [] });
              }}
              value={state.task}
              options={
                tasks?.data?.filter(
                  (item: any) => item?.client?.id === state.client
                ) || []
              }
              getOptionLabel={(option: any) => option?.name}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Link to task"
                  required
                />
              )}
            />
          )}
          {state.task && (
            <Autocomplete
              multiple
              id="tags-standard"
              onChange={(_, value) => {
                setState({ ...state, members: value });
              }}
              value={state.members}
              options={state?.task?.members || []}
              sx={{ mt: 3 }}
              getOptionLabel={(option: any) => {
                return option?.fullName;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  fullWidth
                  label="Members"
                />
              )}
            />
          )}

          <TextField
            label="Event Name"
            variant="outlined"
            sx={{ mt: 3 }}
            size="small"
            fullWidth
            required
            name="title"
            onChange={handleChange}
          />
          <TextField
            label="Location"
            sx={{ mt: 3 }}
            variant="outlined"
            size="small"
            fullWidth
            name="location"
            onChange={handleChange}
          />
          <TextField
            label="Date"
            type="date"
            sx={{ mt: 3 }}
            variant="outlined"
            size="small"
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
            name="date"
            onChange={handleChange}
          />
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                label="Start Time"
                type="time"
                sx={{ mt: 3 }}
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                name="startTime"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="End Time"
                type="time"
                sx={{ mt: 3 }}
                variant="outlined"
                size="small"
                InputLabelProps={{ shrink: true }}
                fullWidth
                required
                name="endTime"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <TextField
            label="Notes"
            multiline
            rows={3}
            type="time"
            sx={{ mt: 3 }}
            variant="outlined"
            size="small"
            name="reminderNotes"
            onChange={handleChange}
            fullWidth
          />
          <FormControlLabel
            sx={{ mt: 2 }}
            control={
              <Checkbox
                checked={reminderChecked}
                onChange={(e) => setReminderChecked(e.target.checked)}
              />
            }
            label="Set Reminder"
          />
          {reminderChecked && (
            <>
              <TextField
                variant="outlined"
                fullWidth
                size="small"
                select
                sx={{ mt: 3 }}
                required
                name="reminder"
                label="Reminder"
                onChange={handleChange}
              >
                {Object.values(Reminders).map((item, index) => (
                  <MenuItem key={index} value={item}>
                    {getTitle(item)}
                  </MenuItem>
                ))}
              </TextField>
            </>
          )}
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={createLoading}
              type="submit"
              fullWidth
              loadingColor="white"
              title="Create Event"
              color="secondary"
            />
          </Box>
        </form>
      )}
    </DrawerWrapper>
  );
}

export default AddEvent;
