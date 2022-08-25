import { Box, Typography } from "@mui/material";
import React from "react";
import TasksByCategory from "../views/task-dashboard/TasksByCategory";
import TaskMetrics from "../views/task-dashboard/task-metrics";
import TaskLogHours from "../views/task-dashboard/task-log-hours/inedx";
import TaskByService from "../views/task-dashboard/task-by-service/index";
import ClientAnalytics from "views/task-dashboard/client-analytics";
import ClientByCategory from "views/task-dashboard/ClientByCategory";
import TaskByStatusTable from "views/task-dashboard/task-status-employess/task-status-table";

export default function TaskDashboard() {
  return (
    <Box p={2}>
      {/* <Typography>dash-board</Typography> */}
      <TaskMetrics />
      <TasksByCategory />
      <TaskByService />
      <ClientAnalytics />
      <ClientByCategory />
      <TaskLogHours />
      <TaskByStatusTable />
    </Box>
  );
}
