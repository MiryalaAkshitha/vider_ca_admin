import React from "react";
import TaskBox from "../../../components/task-dashboard/TaskBox";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TotalNoOfTasksInOrganization from "../task-metrics/TotalNoOfTasksInOrganization";

import { Box, IconButton, Typography } from "@mui/material";

export default function TotalLogHours() {
  return (
    <TaskBox
      title={"Total Log Hours"}
      footer={
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="h6" sx={{ color: "#D31701" }}>
            View Tasks
          </Typography>
          <IconButton sx={{ color: "#D31701" }}>
            <ArrowForwardIcon />
          </IconButton>
        </Box>
      }
    >
      <TotalNoOfTasksInOrganization />
    </TaskBox>
  );
}
