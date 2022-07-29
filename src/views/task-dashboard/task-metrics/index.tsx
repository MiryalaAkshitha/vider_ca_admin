import { Box, Grid, IconButton, Typography } from "@mui/material";
import TaskBox from "components/task-dashboard/TaskBox";
import { useState } from "react";
import { FlexBoxForTaskMetricsFilters } from "../styles";
import Filters from "./Filters";
import TotalNoOfTasksInOrganization from "./TotalNoOfTasksInOrganization";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BarChart from "../../../components/task-dashboard/BarChart";
import TasksByFrequency from "./TasksByFrequency";
import DueDatesThisWeek from "./DueDatesThisWeek";

export default function TaskMetrics() {
  return (
    <>
      <FlexBoxForTaskMetricsFilters>
        <Typography mb={1} variant="subtitle2">
          Task Metrics
        </Typography>
        <Filters />
      </FlexBoxForTaskMetricsFilters>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} item>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6} item>
              <TaskBox
                title={"Total Number of Tasks in Organization"}
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
            </Grid>
            <Grid xs={12} sm={6} item>
              <TaskBox title={"Tasks by Status"}>
                <BarChart
                  data={[
                    { name: "To do", value: 70, color: "#FF3465" },
                    { name: "In Progress", value: 60, color: "#FFCF64" },
                    { name: "On-Hold", value: 45, color: "#00D9A6" },
                    { name: "Review", value: 18, color: "#149ECD" },
                    { name: "Done", value: 39, color: "#88B053" },
                  ]}
                />
              </TaskBox>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TaskBox title={"Tasks by frequency"}>
                <TasksByFrequency />
              </TaskBox>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TaskBox title={"Tasks by Priority"}>
                <BarChart
                  data={[
                    { name: "High", value: 65, color: "#FF3465" },
                    { name: "Medium", value: 43, color: "#00D9A6" },
                    { name: "Low", value: 38, color: "#88B053" },
                  ]}
                />
              </TaskBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={6} item>
          <DueDatesThisWeek />
        </Grid>
      </Grid>
    </>
  );
}
