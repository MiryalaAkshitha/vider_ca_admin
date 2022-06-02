import { Box } from "@mui/system";
import { Grid, Typography, Paper } from "@mui/material";
import { icons } from "assets";
import TasksCard from "./TasksCard";
import BarGraphCard from "./BarGraphCard";
import PieChartCard from "./PieChartCard";
import TasksTableCard from "./TasksTableCard";
import ColorTitleCard from "./ColorTitleCrad";
import { getTitle } from "utils";
import { COLORS } from "utils/constants";

function Dashboard({ data }: any) {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Typography mb={1} variant="subtitle2">
            Clients
          </Typography>
          <TasksCard
            img={icons.totalClients}
            title="Total Number of Clients on board"
            value={data?.clients || 0}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography mb={1} variant="subtitle2">
            Tasks
          </Typography>
          <TasksCard
            img={icons.totalTasks}
            title="Total Number of Tasks Created"
            value={data?.tasks?.total || 0}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TasksCard
                img={icons.taskTodo}
                title="Tasks To-Do"
                value={data?.tasks?.todo || 0}
              />
            </Grid>
            <Grid item xs={4}>
              <TasksCard
                img={icons.taskInprogress}
                title="Tasks In-Progress"
                value={data?.tasks?.inProgress || 0}
              />
            </Grid>
            <Grid item xs={4}>
              <TasksCard
                img={icons.taskInprogress}
                title="Tasks On-Hold"
                value={data?.tasks?.onHold || 0}
              />
            </Grid>
            <Grid item xs={6}>
              <TasksCard
                img={icons.taskUnderReview}
                title="Tasks Under Review"
                value={data?.tasks?.underReview || 0}
              />
            </Grid>
            <Grid item xs={6}>
              <TasksCard
                img={icons.taskCompleted}
                title="Tasks Completed"
                value={data?.tasks?.completed || 0}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              padding: "25px",
              display: "flex",
              gap: 2,
            }}
          >
            <Box>
              <PieChartCard
                data={Object.keys(data?.clientCategories)?.map(
                  (key, index: number) => ({
                    name: getTitle(key),
                    value: data?.clientCategories[key],
                    color: COLORS[index],
                  })
                )}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="subtitle2">Client Categories</Typography>
              <Grid container>
                {Object.keys(data?.clientCategories)?.map(
                  (key, index: number) => (
                    <Grid item xs={6}>
                      <ColorTitleCard color={COLORS[index]} title={key} />
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper
            sx={{
              padding: "25px",
              display: "flex",
              gap: 2,
            }}
          >
            <Box>
              <PieChartCard
                data={Object.keys(data?.categoryWiseTasksCount)?.map(
                  (key, index: number) => ({
                    name: getTitle(key),
                    value: data?.categoryWiseTasksCount[key],
                    color: COLORS[index + 1],
                  })
                )}
              />
            </Box>
            <Box flex={1}>
              <Typography variant="subtitle2">Task Numericals</Typography>
              <Grid container>
                {Object.keys(data?.categoryWiseTasksCount)?.map(
                  (key, index: number) => (
                    <Grid item xs={6}>
                      <ColorTitleCard color={COLORS[index + 1]} title={key} />
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <BarGraphCard data={data} />
        </Grid>
        <Grid item xs={12}>
          <Typography mb={1} variant="subtitle2">
            Tasks Analytics
          </Typography>
          <TasksTableCard data={data?.taskAnalytics} />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
