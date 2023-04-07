import { Box, Button } from "@mui/material";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "data/permissons";
import useQueryParams from "hooks/useQueryParams";
import ClientDashboardAnalytics from "./clientdashboard-analytics";

function BillingOverview() {
  const { queryParams, setQueryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";
  const type = dashboardType === "user" ? "admin" : "user";

  return (
    <Box p={2}>
      <ClientDashboardAnalytics />
    </Box>
  );
}

export default BillingOverview;
