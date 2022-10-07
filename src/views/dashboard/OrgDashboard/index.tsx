import { Box, Button } from "@mui/material";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "data/permissons";
import useQueryParams from "hooks/useQueryParams";
import ClientAnalytics from "./client-analytics";
import LoghourAnalytics from "./loghour-analytics";
import TaskAnalytics from "./task-analytics";

function Dashboard() {
  const { queryParams, setQueryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";
  const type = dashboardType === "user" ? "admin" : "user";

  return (
    <Box p={2}>
      <ValidateAccess name={Permissions.VIEW_ADMIN_DASHBOARD}>
        <Box mb={2} textAlign="right">
          <Button variant="outlined" color="secondary" onClick={() => setQueryParams({ type })}>
            View {dashboardType === "admin" ? "User" : "Admin"} Dashboard
          </Button>
        </Box>
      </ValidateAccess>
      <TaskAnalytics />
      <ClientAnalytics />
      <LoghourAnalytics />
    </Box>
  );
}

export default Dashboard;
