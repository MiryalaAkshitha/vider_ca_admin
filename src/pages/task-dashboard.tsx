import { Box, Typography } from "@mui/material";
import React from "react";
import TasksByCategory from "../views/task-dashboard/TasksByCategory";
import TaskMetrics from "../views/task-dashboard/task-metrics";
import TaskLogHours from "../views/task-dashboard/task-log-hours/inedx";

export default function TaskDashboard() {
  return (
    <Box p={2}>
      <Typography>dash-board</Typography>
      <TaskMetrics />
      <TasksByCategory />
      <TaskLogHours />
    </Box>
  );
}
