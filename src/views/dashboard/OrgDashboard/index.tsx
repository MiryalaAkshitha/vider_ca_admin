import { Box } from "@mui/material";
import ComingSoon from "components/ComingSoon";
import ClientAnalytics from "./client-analytics";
import LoghourAnalytics from "./loghour-analytics";
import TaskAnalytics from "./task-analytics";

function Dashboard() {
  return (
    <Box p={2}>
      <TaskAnalytics />
      <ClientAnalytics />
      <LoghourAnalytics />
      {/* <ComingSoon title="Dashboard" /> */}
    </Box>
  );
}

export default Dashboard;
