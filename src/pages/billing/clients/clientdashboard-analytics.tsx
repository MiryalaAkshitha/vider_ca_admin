import { Box, Grid, Typography } from "@mui/material";
import { getTaskAnalytics } from "api/services/organization";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { ResType } from "types";
import ActivityLog from "./activitylog";
import DashboardUnbilledTasks from "./dashboardunbilledtasks";
import ClientDetailsSection from "./clientdetailssection";
import DashboardBilledTasks from "./dashboardbilledtasks";
import AmountReceive from "./amountreceive";
import AmountDue from "./amountdue";
import PureAgent from "./pureagent";
import Profile from "pages/settings/profile";
function ClientDashboardAnalytics() {
  const { queryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    ["task-analytics", { dashboardType }],
    getTaskAnalytics
  );

  if (isLoading) return <Loader />;

  return (
    <>
      {/* <Profile /> */}
      <Grid container rowSpacing={1} columnSpacing={1} sx={{ marginTop: "10px" }}>
        <Grid sx={{ display: "flex", flexDirection: "row", gap: "10px", height: "305px" }}>
          <Grid>
            <Grid xs={8} item>
              <ClientDetailsSection/>
            </Grid>
          </Grid>
          <Grid xs={8} item>
            <DashboardUnbilledTasks/>
            <Grid sx={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <Grid xs={8} item>
                <AmountReceive/>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={6} item>
            {/* <OverViewDashboardBilled data={data?.data} /> */}
            <DashboardBilledTasks/>
            <Grid xs={6} item>
              <AmountDue/>
            </Grid>
          </Grid>

          <Grid xs={6} item>
            <PureAgent/>
          </Grid>

          {/* <Grid xs={4} item>
            <TasksByFrequency data={data?.data} />
          </Grid> */}
        </Grid>
        <Grid
          item
          xs={8}
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "400px",
            gap: "2px",
          }}
        >
          {/* <Grid>
            <TasksByCategory />
          </Grid> */}
        </Grid>

        <Grid
          sx={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "430px",
            marginTop: "0px",
            gap: "10px",
          }}
        >
          <Grid item xs={6}>
            <ActivityLog />
          </Grid>
          
        </Grid>
        {/* <Grid>
  <TasksByFrequency data={data?.data}/>
</Grid> */}
      </Grid>
    </>
  );
}

export default ClientDashboardAnalytics;

