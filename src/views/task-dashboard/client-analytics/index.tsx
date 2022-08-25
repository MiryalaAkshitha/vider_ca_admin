import { Box, Grid, IconButton, Typography } from "@mui/material";
import TaskBox from "components/task-dashboard/TaskBox";
import { useState } from "react";
import { FlexBoxForClientAnalytics } from "../styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import BarChart from "../../../components/task-dashboard/BarChart";
import NumberOfClients from "./NumberOfClients";
import ClientConversions from "./ClientConversions";
import DscExpiryThisWeek from "./Dsc-expiry-table";
export default function ClientAnalytics() {
  return (
    <>
      <FlexBoxForClientAnalytics>
        <Typography mb={1} variant="subtitle2">
          Client Analytics
        </Typography>
      </FlexBoxForClientAnalytics>
      <Grid container spacing={2}>
        <Grid xs={12} md={6} item>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <Grid xs={12} sm={6} item>
              <TaskBox
                title={"Total Number of Tasks in Organization"}
                footer={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#D31701" }}>
                      View Tasks
                    </Typography>
                    <IconButton sx={{ color: "#D31701" }}>
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                }
              >
                <NumberOfClients />
              </TaskBox>
            </Grid>
            <Grid xs={12} sm={6} item>
              <TaskBox
                title={"Tasks by frequency"}
                footer={
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "#D31701" }}>
                      View Clients
                    </Typography>
                    <IconButton sx={{ color: "#D31701" }}>
                      <ArrowForwardIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ClientConversions />
              </TaskBox>
            </Grid>
          </Grid>
        </Grid>
        <Grid xs={12} md={6} item>
          <DscExpiryThisWeek />
        </Grid>
      </Grid>
    </>
  );
}
