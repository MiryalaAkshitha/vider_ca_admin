import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { StyledTaskBox } from "../styles";
import ClientByCategory from "./ClientByCategory";
import ClientConverstions from "./ClientConversions";
import DscExpiryThisWeek from "./DscExpiryThisWeek";
import TotalNumberOfClients from "./TotalNumberOfClients";

function ClientAnalytics() {
  return (
    <Box mt={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography mb={1} variant="subtitle2">
          Client Analytics
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid xs={4} item>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTaskBox>
                <header>
                  <Typography variant="h6">Total number of clients</Typography>
                </header>
                <main>
                  <TotalNumberOfClients />
                </main>
                <footer>
                  <Typography variant="body2" color="secondary">
                    View Clients
                  </Typography>
                  <IconButton color="secondary" size="small">
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </footer>
              </StyledTaskBox>
            </Grid>
            <Grid item xs={12}>
              <StyledTaskBox>
                <header>
                  <Typography variant="h6">Client Conversions</Typography>
                </header>
                <main>
                  <ClientConverstions />
                </main>
                <footer>
                  <Typography variant="body2" color="secondary">
                    View Clients
                  </Typography>
                  <IconButton color="secondary" size="small">
                    <ArrowForwardIcon fontSize="small" />
                  </IconButton>
                </footer>
              </StyledTaskBox>
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
