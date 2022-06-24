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
import Tasks from "./components/Tasks";
import ClientCategories from "./components/ClientCategories";
import TaskCategories from "./components/TaskCategories";
import UserStats from "./components/UserStats";

function Dashboard() {
  return (
    <Box p={2}>
      <Tasks />
      {/* <TasksCard
        img={icons.totalClients}
        title="Total Number of Clients on board"
        value={"sdf"}
      /> */}
      <Grid container mt={2} spacing={2}>
        <Grid item xs={6}>
          <ClientCategories />
        </Grid>
        <Grid item xs={6}>
          <TaskCategories />
        </Grid>
      </Grid>
      <UserStats />
      {/* 
        
        <Grid item xs={12}>
          <BarGraphCard data={data} />
        </Grid>
        <Grid item xs={12}>
          <Typography mb={1} variant="subtitle2">
            Tasks Analytics
          </Typography>
          <TasksTableCard data={data?.taskAnalytics} />
        </Grid> */}
    </Box>
  );
}

export default Dashboard;
