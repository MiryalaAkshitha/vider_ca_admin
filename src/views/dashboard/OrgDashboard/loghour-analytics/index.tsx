import { Box, Grid, Typography } from "@mui/material";
import { StyledTaskBox } from "../styles";
import TaskStatusByEmployees from "./TaskStatusByEmployees";
import TotalLogHours from "./TotalLogHours";
import WeeklyLogHoursDigest from "./WeeklyLogHoursDigest";

function LoghourAnalytics() {
  return (
    <Box mt={3}>
      <Typography mb={1} variant="subtitle2" sx={{ mb: 2 }}>
        Task Log Hours
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <StyledTaskBox>
            <header>
              <Typography variant="h6">Total log hours</Typography>
            </header>
            <main>
              <TotalLogHours />
            </main>
          </StyledTaskBox>
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
