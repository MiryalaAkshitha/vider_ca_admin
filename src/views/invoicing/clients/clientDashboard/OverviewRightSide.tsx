import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import Activity from "./Activity";
import { BarChatCard, CardComponent, PieChartCard } from "./OverviewCard";

const OverviewRightSide = () => {
  return (
    <Box pl={2}>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper>
                <CardComponent title="Unbilled Tasks" value="24" />
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper>
                <CardComponent title="Billed Tasks" value="14" />
              </Paper>
            </Grid>
            <Grid mt={1} item xs={6}>
              <Paper>
                <CardComponent title="Amount Received" value="25,500/-" />
              </Paper>
            </Grid>
            <Grid mt={1} item xs={6}>
              <Paper>
                <CardComponent title="Amount Due" value="45,200/-" />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2}>
          <Paper>
            <Box>
              <Typography p={1} variant="caption" component="div">Pure Agent</Typography>
              <Divider />
              <CardComponent title="Amount Received" value="25,500/-" />
              <Divider />
              <CardComponent title="Amount Due" value="45,200/-" />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={5}>
          <Paper>
            <Box p={1} display="flex" justifyContent="space-between">
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Filter by</InputLabel>
                  <Select
                    size="small"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Filter by"
                  >
                    <MenuItem value={10}>Billed</MenuItem>
                    <MenuItem value={20}>Unbilled</MenuItem>
                    <MenuItem value={30}>Pure Agent</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Box>
                <Typography >December 2021</Typography>
              </Box>
            </Box>
            <Divider />
            <Box display="flex" alignItems="center">
              <PieChartCard />
              <Box>
                <Box display="flex" alignItems="center">
                  <Box m={2} sx={{ width: "15px", height: "15px", bgcolor: "#FFD950" }}></Box>
                  <Typography variant="body2">Amount Paid</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Box m={2} sx={{ width: "15px", height: "15px", bgcolor: "#4791FF" }}></Box>
                  <Typography variant="body2">Amount Due</Typography>
                </Box>

              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <Box mt={2}>
        <Paper>
          <Typography p={1} variant="caption" component="div">Revenue Statistics</Typography>
          <Divider />
          <Box>
            <BarChatCard />
          </Box>
        </Paper>
      </Box>
      <Box p={2}>
        <Activity />
      </Box>
    </Box>
  );
}

export default OverviewRightSide