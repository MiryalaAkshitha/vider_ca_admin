import { Box, Grid, MenuItem, TextField } from "@mui/material";
import DrawerWrapper from "components/DrawerWrapper";
import { getTitle } from "utils";
import { Reminders } from "utils/constants";

const AddEventData = ({ open, setOpen, data }) => {
  const handleChange = (e: any) => {};

  return (
    <>
      <DrawerWrapper
        open={open}
        setOpen={setOpen}
        title="Update Events to Calendar"
      >
        <Box mt={2}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="client"
            name="client"
            value={data.client}
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            select
            onChange={handleChange}
            label="Task"
            name="catetaskgory"
            value={data?.task}
          />
        </Box>
        <Box mt={2}>
          <TextField
            fullWidth
            select
            onChange={handleChange}
            label="Members"
            name="members"
            value={data?.fullName}
          >
            <MenuItem>names</MenuItem>
          </TextField>
        </Box>
        <Box mt={2}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Title"
            name="title"
            value={data.title}
          />
        </Box>
        <Box mt={2}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Location"
            name="location"
            value={data.location}
          />
        </Box>
        <Box mt={2}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Date"
            name="date"
            value={data.date}
          />
        </Box>
        <Box mt={2}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Start Time"
            name="startTime"
            value={data.startTime}
          />
        </Box>
        <Box mt={2}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                fullWidth
                label="Start Time"
                name="startTime"
                value={data.startTime}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                onChange={handleChange}
                fullWidth
                label="End Time"
                name="endTime"
                value={data.endTime}
              />
            </Grid>
          </Grid>
        </Box>
        <Box mt={2}>
          <TextField
            onChange={handleChange}
            fullWidth
            label="Notes"
            name="notes"
            value={data.notes}
          />
        </Box>
        <Box mt={2}>
          <TextField
            onChange={handleChange}
            select
            fullWidth
            label="Set Reminder"
            name="reminderCheck"
            value={data.reminder}
          >
            {Object.values(Reminders).map((item: any) => (
              <MenuItem key={item.id} value={item}>
                {getTitle(item)}
              </MenuItem>
            ))}
          </TextField>
        </Box>
      </DrawerWrapper>
    </>
  );
};
export default AddEventData;
