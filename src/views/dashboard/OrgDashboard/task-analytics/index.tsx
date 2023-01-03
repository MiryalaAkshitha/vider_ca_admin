import { Box, Grid, Typography } from "@mui/material";
import { getTaskAnalytics } from "api/services/organization";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { ResType } from "types";
import DueDatesThisWeek from "./DueDatesThisWeek";
import OverDueTasks from "./OverDueTasks";
import TasksByCategory from "./TasksByCategory";
import TasksByFrequency from "./TasksByFrequency";
import TasksByPriority from "./TasksByPriority";
import TasksByService from "./TasksByService";
import TasksByStatus from "./TasksByStatus";
import TotalNumberOfTasks from "./TotalNumberOfTasks";

function TaskAnalytics() {
  const { data, isLoading }: ResType = useQuery(["task-analytics"], getTaskAnalytics);

  if (isLoading) return <Loader />;

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography mb={1} variant="subtitle2">
          Task Analytics
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <TotalNumberOfTasks data={data?.data} />
            </Grid>
            <Grid xs={6} item>
              <TasksByStatus data={data?.data} />
            </Grid>
            <Grid xs={6} item>
              <TasksByFrequency data={data?.data} />
            </Grid>
            <Grid xs={6} item>
              <TasksByPriority data={data?.data} />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={6} item>
          <Box sx={{ height: "100%", position: "relative" }}>
            <DueDatesThisWeek />
          </Box>
        </Grid>
        <Grid item xs={12} mt={2}>
          <TasksByCategory />
        </Grid>
        <Grid item xs={6} mt={2}>
          <TasksByService />
        </Grid>
        <Grid item xs={6} mt={2}>
          <OverDueTasks />
        </Grid>
      </Grid>
    </>
  );
}

export default TaskAnalytics;
