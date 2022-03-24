import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { createEvent } from "api/services/events";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import { TaskDataContext } from "context/TaskDataContext";
import useSnack from "hooks/useSnack";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps, InputChangeType, SubmitType } from "types";
import { getTitle } from "utils";
import { Reminders } from "utils/constants";

interface IState {
  title: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  reminder: string;
  reminderNotes: string;
  client: number | null;
  task: any;
  members: Array<any>;
}

function LinkEvent({ open, setOpen }: DialogProps) {
  const { taskData }: any = useContext(TaskDataContext);
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [reminderChecked, setReminderChecked] = useState<boolean>(false);
  const [state, setState] = useState<IState>({
    title: "",
    location: "",
    date: "",
    startTime: "",
    endTime: "",
    reminder: "",
    reminderNotes: "",
    client: null,
    task: null,
    members: [],
  });

  const { mutate, isLoading: createLoading } = useMutation(createEvent, {
    onSuccess: () => {
      snack.success("Event Created");
      setOpen(false);
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
      task: taskData?.id,
      client: taskData?.client?.id,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Create an Event">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          multiple
          id="tags-standard"
          onChange={(_, value) => {
            setState({ ...state, members: value });
          }}
          value={state.members}
          options={taskData?.members || []}
          getOptionLabel={(option: any) => {
            return option?.fullName;
          }}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
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
        <TextField
          label="Event Name"
          variant="outlined"
          sx={{ mt: 3 }}
          size="small"
          fullWidth
          required
          value={state.title || ""}
          name="title"
          onChange={handleChange}
        />
        <TextField
          label="Location"
          sx={{ mt: 3 }}
          variant="outlined"
          size="small"
          fullWidth
          value={state.location || ""}
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
          value={state.date || ""}
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
              value={state.startTime || ""}
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
              value={state.endTime || ""}
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
          value={state.reminderNotes || ""}
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
              value={state.reminder}
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
    </DrawerWrapper>
  );
}

export default LinkEvent;
