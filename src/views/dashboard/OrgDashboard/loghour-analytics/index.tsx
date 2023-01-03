import { Box, Grid, Typography } from "@mui/material";
import TaskStatusByEmployees from "./TaskStatusByEmployees";
import TotalLogHours from "./TotalLogHours";
import WeeklyLogHoursDigest from "./WeeklyLogHoursDigest";

function LoghourAnalytics() {
  return (
    <Box mt={3}>
      <Typography mb={1} variant="subtitle2" sx={{ mb: 2 }}>
        Log Hours Analytics
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <TotalLogHours />
        </Grid>
        <Grid item md={9} sm={6} xs={12}>
          <WeeklyLogHoursDigest />
        </Grid>
        <Grid item xs={12}>
          <TaskStatusByEmployees />
        </Grid>
      </Grid>
    </Box>
  );
}

export default LoghourAnalytics;
