import {
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  MenuItem,
  TextField,
} from "@mui/material";
import { updateEvent } from "api/services/events";
import DrawerWrapper from "components/DrawerWrapper";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
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
  reminder: string | null;
  reminderNotes: string | null;
  client: number | null;
  task: any;
  members: Array<any>;
}

interface Props extends DialogProps {
  task: any;
  event: any;
}

function EditEvent({ open, setOpen, task, event }: Props) {
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

  useEffect(() => {
    setState(event);
    if (event.reminder) {
      setReminderChecked(true);
    }
  }, [event]);

  const { mutate, isLoading: createLoading } = useMutation(updateEvent, {
    onSuccess: () => {
      snack.success("Event Updated");
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
    let data = { ...state };
    if (!reminderChecked) {
      data.reminder = null;
      data.reminderNotes = null;
    }
    mutate({
      id: event.id,
      data,
    });
  };

  return (
    <DrawerWrapper open={open} setOpen={setOpen} title="Edit Event">
      <form onSubmit={handleSubmit}>
        <Autocomplete
          multiple
          id="tags-standard"
          onChange={(_, value) => {
            setState({ ...state, members: value });
          }}
          value={state.members || []}
          isOptionEqualToValue={(option, value) => {
            return option.id === value.id;
          }}
          options={task?.members || []}
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
        <TextField
          label="Event Name"
          variant="outlined"
          sx={{ mt: 3 }}
          size="small"
          fullWidth
          required
          name="title"
          value={state.title || ""}
          onChange={handleChange}
        />
        <TextField
          label="Location"
          sx={{ mt: 3 }}
          variant="outlined"
          size="small"
          value={state.location || ""}
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
              InputLabelProps={{ shrink: true }}
              fullWidth
              required
              value={state.startTime || ""}
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
              value={state.endTime || ""}
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
          value={state.reminderNotes || ""}
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
              value={state.reminder || ""}
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
            title="Update Event"
            color="secondary"
          />
        </Box>
      </form>
    </DrawerWrapper>
  );
}

export default EditEvent;
