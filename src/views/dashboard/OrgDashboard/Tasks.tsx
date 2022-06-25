import { Grid, Typography } from "@mui/material";
import { getOrganizationDashboard } from "api/services/organization";
import { icons } from "assets";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { ResType } from "types";
import TasksCard from "./TasksCard";

function Tasks() {
  const { data, isLoading }: ResType = useQuery(
    ["org-dashboard-tasks", "TASKS"],
    getOrganizationDashboard
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Typography mb={1} variant="subtitle2">
        Tasks
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TasksCard
            img={icons.totalClients}
            title="Total Number of Clients on board"
            value={data?.data?.totalClients || 0}
          />
        </Grid>
        <Grid item xs={6}>
          <TasksCard
            img={icons.totalTasks}
            title="Total Number of Tasks Created"
            value={data?.data?.totalTasks || 0}
          />
        </Grid>
        <Grid item xs={4}>
          <TasksCard
            img={icons.taskTodo}
            title="Tasks To-Do"
            value={data?.data?.todo || 0}
          />
        </Grid>
        <Grid item xs={4}>
          <TasksCard
            img={icons.taskInprogress}
            title="Tasks In-Progress"
            value={data?.data?.inProgress || 0}
          />
        </Grid>
        <Grid item xs={4}>
          <TasksCard
            img={icons.taskInprogress}
            title="Tasks On-Hold"
            value={data?.data?.onHold || 0}
          />
        </Grid>
        <Grid item xs={4}>
          <TasksCard
            img={icons.taskUnderReview}
            title="Tasks Under Review"
            value={data?.data?.underReview || 0}
          />
        </Grid>
        <Grid item xs={4}>
          <TasksCard
            img={icons.taskCompleted}
            title="Tasks Completed"
            value={data?.data?.completed || 0}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default Tasks;
