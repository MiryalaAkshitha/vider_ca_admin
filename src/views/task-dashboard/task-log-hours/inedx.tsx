import { Box, Grid, Typography } from "@mui/material";
import TasksByCategory from "../TasksByCategory";
import BottomPerformers from "./performers/BottomPerformers";
import TopPerformers from "./performers/TopPerformers";
import TotalLogHours from "./TotalLogHours";
import WeeklyLogHoursDigest from "./WeeklyLogHoursDigest";

export default function TaskLogHours() {
  return (
    <Box>
      <Typography mb={1} variant="subtitle2">
        Task Log Hours
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={3} sm={6} xs={12}>
          <TotalLogHours />
        </Grid>
        <Grid item md={9} sm={6} xs={12}>
          <WeeklyLogHoursDigest />
        </Grid>
        <Grid item md={6} sm={12}>
          <TopPerformers />
        </Grid>
        <Grid item md={6} sm={12}>
          <BottomPerformers />
        </Grid>
        <Grid item xs={12}>
          <TasksByCategory name="Tasks Log Hours by Category" noPadding />
        </Grid>
        <Grid item xs={12}></Grid>
        <Grid item md={8} sm={12}></Grid>
        <Grid item md={4} sm={12}></Grid>
      </Grid>
    </Box>
  );
}
