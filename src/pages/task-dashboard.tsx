import { Box, Typography } from "@mui/material";
import React from "react";
import TaskMetrics from "../views/task-dashboard/task-metrics";

export default function TaskDashboard() {
  return (
    <Box p={2}>
      <TaskMetrics />
    </Box>
  );
}
