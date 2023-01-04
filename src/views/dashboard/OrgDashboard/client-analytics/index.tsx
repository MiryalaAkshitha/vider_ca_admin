import { Box, Grid, Typography } from "@mui/material";
import { getClientAnalytics } from "api/services/organization";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import ClientByCategory from "./ClientByCategory";
import ClientConverstions from "./ClientConversions";
import DscExpiryThisWeek from "./DscExpiryThisWeek";
import TotalNumberOfClients from "./TotalNumberOfClients";

function ClientAnalytics() {
  const { data, isLoading } = useQuery(["client-analytics"], getClientAnalytics);

  if (isLoading) return <Loader />;

  return (
    <Box mt={3}>
      <Grid container spacing={2}>
        <Grid xs={4} item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TotalNumberOfClients data={data?.data} />
            </Grid>
            <Grid item xs={12}>
              <ClientConverstions data={data?.data} />
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={8} item>
          <Box sx={{ height: "100%", position: "relative" }}>
            <DscExpiryThisWeek />
          </Box>
        </Grid>
        <Grid xs={12} item>
          <ClientByCategory />
        </Grid>
      </Grid>
    </Box>
  );
}

export default ClientAnalytics;
