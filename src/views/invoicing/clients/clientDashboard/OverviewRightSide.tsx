import { Box, Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, Typography } from "@mui/material";
import Activity from "./Activity";
import { BarChatCard, CardComponent, PieChartCard } from "./OverviewCard";

const OverviewRightSide = () => {
  return (
    <Box pl={2} sx={{ width: "100%" }}>
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
            <Box display="flex" alignItems="center" justifyContent="center">
              <PieChartCard data={pieData} colors={colors} width={170} height={190} cx={80} cy={100} />
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
            <BarChatCard data={barData} barInfo={barInfo} width="100%" height={2.5} />
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

const pieData = [
  { name: "Group A", value: 50 },
  { name: "Group B", value: 300 },

];

const colors = ["#FFD950", "#4791FF"];


const barInfo = [
  {
    name: "pv",
    color: "#8884d8"
  },
  {
    name: "uv",
    color: "#82ca9d"
  },
]

const barData = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]