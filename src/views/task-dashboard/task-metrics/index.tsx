import { Box, Grid, IconButton, Typography } from "@mui/material";
import TaskBox from "components/task-dashboard/TaskBox";
import { useState } from "react";
import { FlexBoxForTaskMetricsFilters } from "../styles";
import Filters from "./Filters";
import TotalNoOfTasksInOrganization from "./TotalNoOfTasksInOrganization";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TasksByStatus from "./TasksByStatus";

export default function TaskMetrics() {
  const [year, setYear] = useState<null | Date>(new Date());
  const [month, setMonth] = useState<null | string>(null);
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
                <TasksByStatus />
              </TaskBox>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TaskBox title={"Tasks by frequency"}>
                <TotalNoOfTasksInOrganization />
              </TaskBox>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TaskBox title={"Tasks by Priority"}>
                <TotalNoOfTasksInOrganization />
              </TaskBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={6} item>
          <TaskBox title={"Due dates this week"}>
            <TotalNoOfTasksInOrganization />
          </TaskBox>
        </Grid>
      </Grid>
    </>
  );
}
