import { Box } from "@mui/system";
import { Grid, Typography, Paper } from "@mui/material";
import { icons } from "assets";
import TasksCard from "./TasksCard";
import BarGraphCard from "./BarGraphCard";
import PieChartCard from "./PieChartCard";
import TasksTableCard from "./TasksTableCard";
import ColorTitleCard from "./ColorTitleCrad";

function Dashboard() {
  return (
    <Box p={2}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Typography mb={1} variant="subtitle2">
            Clients
          </Typography>
          <TasksCard
            img={icons.totalClients}
            title="Total Number of Clients on board"
            value="12"
          />
        </Grid>
        <Grid item xs={8}>
          <Typography mb={1} variant="subtitle2">
            Tasks
          </Typography>
          <TasksCard
            img={icons.totalTasks}
            title="Total Number of Tasks Created"
            value="34"
          />
        </Grid>

        <Grid item xs={4}>
          <Typography mb={1} variant="caption">
            User
          </Typography>
          <Paper sx={{ padding: "25px" }}>
            <Grid container>
              <Grid item xs={5}>
                <PieChartCard />
              </Grid>
              <Grid
                item
                xs={7}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Grid container>
                  <Typography p={2} variant="subtitle2">
                    Client Categories
                  </Typography>
                  <Grid item xs={6}>
                    <ColorTitleCard color="#88B151" title="HUF" />
                  </Grid>
                  <Grid item xs={6}>
                    <ColorTitleCard color="#F7964F" title="Individuals" />
                  </Grid>
                  <Grid item xs={6}>
                    <ColorTitleCard color="#673AB7" title="Companies" />
                  </Grid>
                  <Grid item xs={6}>
                    <ColorTitleCard color="#64B5F6" title="Partnership firms" />
                  </Grid>
                  <Grid item xs={6}>
                    <ColorTitleCard color="#C0FF8C" title="Others" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={8}>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <TasksCard img={icons.taskTodo} title="Tasks To-Do" value="14" />
            </Grid>
            <Grid item xs={4}>
              <TasksCard
                img={icons.taskInprogress}
                title="Tasks In-Progress"
                value="14"
              />
            </Grid>
            <Grid item xs={4}>
              <TasksCard
                img={icons.taskInprogress}
                title="Tasks On-Hold"
                value="14"
              />
            </Grid>
            <Grid item xs={6}>
              <TasksCard
                img={icons.taskUnderReview}
                title="Tasks Under Review"
                value="5"
              />
            </Grid>
            <Grid item xs={6}>
              <TasksCard
                img={icons.taskCompleted}
                title="Tasks Completed"
                value="3"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <BarGraphCard />
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography mb={1} variant="subtitle2">
                Tasks Analytics
              </Typography>
              <TasksTableCard />
            </Grid>
            <Grid item xs={4}>
              <Typography mb={1} variant="subtitle2">
                Task Numericals
              </Typography>
              <Paper sx={{ padding: "25px" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box mt={5}>
                    <PieChartCard />
                  </Box>
                  <Typography variant="caption">Category wise Tasks</Typography>

                  <Grid
                    container
                    sx={{
                      width: "70%",
                      display: "flex",
                      marginTop: "15px",
                    }}
                  >
                    <Grid item xs={6} display="flex" justifyContent="center">
                      <ColorTitleCard color="#88B151" title="GST" />
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="center">
                      <ColorTitleCard color="#F7964F" title="Income Tax" />
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="center">
                      <ColorTitleCard color="#673AB7" title="MCA" />
                    </Grid>
                    <Grid item xs={6} display="flex" justifyContent="center">
                      <ColorTitleCard color="#64B5F6" title="Registrations" />
                    </Grid>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
