import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import BarChart from "../components/BarChart";
import { StyledTaskBox } from "../styles";
import DueDatesThisWeek from "./DueDatesThisWeek";
import Filters from "./Filters";
import TasksByService from "./TasksByService";
import TasksByCategory from "./TasksByCategory";
import TasksByFrequency from "./TasksByFrequency";
import TotalNoOfTasksInOrganization from "./TotalNoOfTasksInOrganization";
import OverDueTasks from "./OverDueTasks";

function TaskAnalytics() {
  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography mb={1} variant="subtitle2">
          Task Analytics
        </Typography>
        <Filters />
      </Box>
      <Grid container spacing={2}>
        <Grid xs={6} item>
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <StyledTaskBox>
                <header>
                  <Typography variant="h6">Total number of tasks</Typography>
                </header>
                <main>
                  <TotalNoOfTasksInOrganization />
                </main>
                <footer>
                  <Typography variant="body2" color="secondary">
                    View Tasks
                  </Typography>
                  <IconButton color="secondary" size="small">
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </footer>
              </StyledTaskBox>
            </Grid>
            <Grid xs={6} item>
              <StyledTaskBox>
                <header>
                  <Typography variant="h6">Tasks by status</Typography>
                </header>
                <main>
                  <BarChart
                    data={[
                      { name: "To do", value: 70, color: "#FF3465" },
                      { name: "In Progress", value: 60, color: "#FFCF64" },
                      { name: "On-Hold", value: 45, color: "#00D9A6" },
                      { name: "Review", value: 18, color: "#149ECD" },
                      { name: "Done", value: 39, color: "#88B053" },
                    ]}
                  />
                </main>
                <footer>
                  <Typography variant="body2" color="secondary">
                    View Tasks
                  </Typography>
                  <IconButton color="secondary" size="small">
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </footer>
              </StyledTaskBox>
            </Grid>
            <Grid xs={6} item>
              <StyledTaskBox>
                <header>
                  <Typography variant="h6">Tasks by frequency</Typography>
                </header>
                <main>
                  <TasksByFrequency />
                </main>
                <footer>
                  <Typography variant="body2" color="secondary">
                    View Tasks
                  </Typography>
                  <IconButton color="secondary" size="small">
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </footer>
              </StyledTaskBox>
            </Grid>
            <Grid xs={6} item>
              <StyledTaskBox>
                <header>
                  <Typography variant="h6">Tasks by priority</Typography>
                </header>
                <main>
                  <BarChart
                    data={[
                      { name: "High", value: 65, color: "#FF3465" },
                      { name: "Medium", value: 43, color: "#00D9A6" },
                      { name: "Low", value: 38, color: "#88B053" },
                    ]}
                  />
                </main>
                <footer>
                  <Typography variant="body2" color="secondary">
                    View Tasks
                  </Typography>
                  <IconButton color="secondary" size="small">
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </footer>
              </StyledTaskBox>
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
