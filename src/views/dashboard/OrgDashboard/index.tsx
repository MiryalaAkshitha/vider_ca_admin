import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import ClientCategories from "./ClientCategories";
import TaskCategories from "./TaskCategories";
import Tasks from "./Tasks";

function Dashboard() {
  return (
    <Box p={2}>
      <Tasks />
      <Grid container mt={2} spacing={2}>
        <Grid item xs={6}>
          <ClientCategories />
        </Grid>
        <Grid item xs={6}>
          <TaskCategories />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
