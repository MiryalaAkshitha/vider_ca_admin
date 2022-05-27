import { Divider, FormControl, Grid, InputLabel, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { useState } from "react";
import { BarChatCard, PieChartCard } from "../clients/clientDashboard/OverviewCard";
import AgeingDues from "./AgeingDues";
import FavIcon from "./FavIcon";

function DashboardInvoice() {

  const [filterBy, setFilterBy] = useState("");
  const [, setSearch] = useState("");


  return (
    <Box p={3}>
      <Box>
        <FormControl size="small" sx={{ minWidth: "140px" }}>
          <InputLabel id=" ">Filter By</InputLabel>
          <Select
            labelId="filter"
            label="Filter By"
            value={filterBy}
            onChange={(e) => {
              setFilterBy(e.target.value);
            }}
          >
            <MenuItem value={"Financial year"}>Financial year</MenuItem>
            <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
            <MenuItem value={"Monthly"}>Monthly</MenuItem>
            <MenuItem value={"Weekly"}>Weekly</MenuItem>
            <MenuItem value={"Custom"}>Day</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ ml: "15px" }}
          size="small"
          id="date"
          type={"date"}
          InputLabelProps={{ shrink: true }}
          label="Invoice Date"
          variant="outlined"
          onChange={(e) => { }}
        />
      </Box>
      <Paper>
        <Box mt={2} p={2}>
          <Box display="flex" justifyContent="space-between" >
            <Typography variant="inherit" > Revenue Statistics</Typography>
            <Box display="flex">
              <FormControl size="small" sx={{ minWidth: "140px", mr: "15px" }}>
                <InputLabel id=" ">Filter By</InputLabel>
                <Select
                  labelId="filter"
                  label="Filter By"
                  value={filterBy}
                  onChange={(e) => {
                    setFilterBy(e.target.value);
                  }}
                >
                  <MenuItem value={"Weekly"}>Client Category</MenuItem>
                  <MenuItem value={"Custom"}>Services Category</MenuItem>
                </Select>
              </FormControl>
              <SearchContainer
                minWidth="200px"
                placeHolder="Search for estimate"
                onChange={setSearch}
              />
            </Box>
          </Box>
          <Box >
            <BarChatCard data={barData} barInfo={barInfo} width="100%" height={4} />
          </Box>
        </Box>
      </Paper >
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper>
            <Box mt={2}>
              <Typography p={2} sx={{}} variant="inherit" component="div">Top 10 Receivables</Typography>
              <Table data={receivablesData || []} columns={receivablesColumns} loading={false} />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper>
            <Box mt={2} p={2} display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="inherit">Receivables chart</Typography>
              <FormControl sx={{ width: "150px" }}>
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
            <Divider />
            <PieChartCard data={pieData} colors={pieColors} width={450} height={250} cx={230} cy={120} />
            <Divider />
            <Box p={2} display="flex" justifyContent="space-evenly">
              <Box display="flex" alignItems="center">
                <Box m={2} sx={{ width: "15px", height: "15px", bgcolor: "#FFD950" }}></Box>
                <Typography variant="body2">Amount Received</Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box m={2} sx={{ width: "15px", height: "15px", bgcolor: "#4791FB" }}></Box>
                <Typography variant="body2">Amount Receivable</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      <AgeingDues />
      <FavIcon />

    </Box >
  );
}

export default DashboardInvoice;


const dueBy = [
  "0-15 Days",
  "15-30 Days",
  "30-45 Days",
  "Above Days"
]


const pieData = [
  { name: "Group A", value: 50 },
  { name: "Group B", value: 300 },

];

const pieColors = ["#FFD950", "#4791FF"];


const barInfo = [
  {
    name: "amountReceived",
    color: "#8884d8"
  },
  {
    name: "amountGenerated",
    color: "#82ca9d"
  },
]
const barData = [
  {
    name: "Feb-23",
    amountReceived: 4000,
    amountGenerated: 2400,
  },
  {
    name: "Jan-2",
    amountReceived: 3000,
    amountGenerated: 1398,
  },
  {
    name: "Page C",
    amountReceived: 2000,
    amountGenerated: 9800,
  },
  {
    name: "Page C",
    amountReceived: 2000,
    amountGenerated: 9800,
  },
  {
    name: "Page C",
    amountReceived: 2000,
    amountGenerated: 9800,
  },
  {
    name: "Page C",
    amountReceived: 2000,
    amountGenerated: 9800,
  },
  {
    name: "Page C",
    amountReceived: 2000,
    amountGenerated: 9800,
  },
  {
    name: "Page C",
    amountReceived: 2000,
    amountGenerated: 9800,
  },
  {
    name: "Page C",
    amountReceived: 2000,
    amountGenerated: 9800,
  },
  {
    name: "Page D",
    amountReceived: 2780,
    amountGenerated: 3908,
  },
  {
    name: "Page E",
    amountReceived: 1890,
    amountGenerated: 4800,
  },
  {
    name: "Page F",
    amountReceived: 2390,
    amountGenerated: 3800,
  },
  {
    name: "Page G",
    amountReceived: 3490,
    amountGenerated: 4300,
  }
]



const receivablesColumns = [
  {
    key: "clientName",
    title: "Client name",
  },
  {
    key: "taskName",
    title: "Task name (Task ID)",
  },
  {
    key: "amountReceivable",
    title: "amountReceivable",
  },

];

const receivablesData = [
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    amountReceivable: "20,000 /-",

  },

  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    amountReceivable: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    amountReceivable: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    amountReceivable: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    amountReceivable: "20,000 /-",

  },
];