import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import {
  Autocomplete,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Loader from "components/Loader";
import useTaskViewData from "./useTaskViewData";

function Details() {
  const { users, task, loading } = useTaskViewData();

  if (loading) return <Loader minHeight="60vh" />;

  return (
    <Box p={2}>
      <Box
        display="flex"
        p={3}
        bgcolor="#FBF9F2"
        justifyContent="space-between"
      >
        <Box display="flex" gap={2} alignItems="center">
          <Box bgcolor="white" p={2} borderRadius={2}>
            <AssignmentOutlinedIcon fontSize="medium" />
          </Box>
          <div>
            <Typography variant="subtitle2" color="primary">
              Company Registration
            </Typography>
            <Typography variant="body2" color="gray">
              Created by shashank Preetham on 02/Aug/2021, 01:37 PM
            </Typography>
          </div>
        </Box>
        <Box textAlign="right">
          <Typography variant="body2" color="gray">
            Task ID
          </Typography>
          <Typography variant="subtitle2" color="primary">
            VD1234
          </Typography>
        </Box>
      </Box>
      <Box mt={4}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs={12}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={users?.data || []}
              getOptionLabel={(option) => {
                return option?.firstName + " " + option?.lastName;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="medium"
                  variant="outlined"
                  label="Select Members"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mt: 2 }}
              disabled
              size="medium"
              fullWidth
              label="Client"
              value={task?.data?.client?.displayName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mt: 2 }}
              size="medium"
              fullWidth
              label="Status"
              select
            >
              <MenuItem>Todo</MenuItem>
              <MenuItem>Progress</MenuItem>
              <MenuItem>Done</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mt: 2 }}
              type="date"
              size="medium"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Due Date"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Priority"
              sx={{ mt: 2 }}
              size="medium"
              fullWidth
              select
              label="Priority"
            >
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="progress">Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Category"
              sx={{ mt: 2 }}
              size="medium"
              fullWidth
              select
              label="Category"
            >
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="progress">Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <TextField
              placeholder="Sub Category"
              sx={{ mt: 2 }}
              size="medium"
              fullWidth
              select
              label="Sub Category"
            >
              <MenuItem value="todo">Todo</MenuItem>
              <MenuItem value="progress">Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              id="tags-standard"
              sx={{ mt: 2 }}
              options={["hello", "world"]}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="medium"
                  variant="outlined"
                  label="Task Owner"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Autocomplete
              multiple
              id="tags-standard"
              options={["hello", "world"]}
              sx={{ mt: 2 }}
              getOptionLabel={(option) => option}
              renderInput={(params) => (
                <TextField
                  {...params}
                  size="medium"
                  variant="outlined"
                  label="Tags"
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mt: 2 }}
              size="medium"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Fee Amount"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              sx={{ mt: 2 }}
              size="medium"
              fullWidth
              InputLabelProps={{ shrink: true }}
              label="Directory"
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default Details;
