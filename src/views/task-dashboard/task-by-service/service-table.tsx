import React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EventIcon from "@mui/icons-material/Event";
import EastIcon from "@mui/icons-material/East";
import { Link } from "react-router-dom";
import {
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";

function createData(ServiceName, NumberOfTasks, TotalLogHours) {
  return { ServiceName, NumberOfTasks, TotalLogHours };
}

const rows = [
  createData(
    "Form 49B: Application For Allotment Of TAN",
    "04-10%",
    "09hr:30min"
  ),
  createData(
    "Form 49B: Application For Allotment Of TAN",
    "04-10%",
    "09hr:30min"
  ),
  createData(
    "Form 49B: Application For Allotment Of TAN",
    "04-10%",
    "09hr:30min"
  ),
  createData(
    "Form 49B: Application For Allotment Of TAN",
    "04-10%",
    "09hr:30min"
  ),
  createData(
    "Form 49B: Application For Allotment Of TAN",
    "04-10%",
    "09hr:30min"
  ),
];
const TYPES = [
  { name: "Last Day", color: "#58094F" },
  { name: "7 Days", color: "#F3AA20" },
  { name: "15 Days", color: "#346B6D" },
  { name: "30 Days", color: "#346B6D" },
];
export default function TaskByServiceTable() {
  const [type, setType] = useState<null | string>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow sx={{ backgroundColor: "#F5F5F5" }}>
            <TableCell>Task by Service</TableCell>

            <TableCell>
              <FormControl sx={{ width: "150px" }}>
                <InputLabel id="demo-simple-select-label">Frequency</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={type}
                  label="Frequency"
                  onChange={(e) => {
                    setType(e.target.value);
                  }}
                >
                  {TYPES.map((type: any) => {
                    return <MenuItem value={type.name}>{type.name}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            </TableCell>

            <TableCell>
              <TextField
                label="Custum Dates"
                InputProps={{
                  endAdornment: (
                    <IconButton
                      //   aria-describedby={id}
                      onClick={(event: any) => {
                        setAnchorEl(event.currentTarget);
                      }}
                    >
                      <EventIcon />
                    </IconButton>
                  ),
                }}
                disabled
              />
            </TableCell>
            <TableCell>
              <Button variant="outlined" color="secondary">
                Apply
              </Button>
            </TableCell>
          </TableRow>
          <TableRow sx={{ color: "#707070" }}>
            <TableCell sx={{ color: "#707070" }}>Service Name</TableCell>
            <TableCell sx={{ color: "#707070" }} align="right">
              Number of tasks
            </TableCell>
            <TableCell sx={{ color: "#707070" }} align="right">
              Total log Hours
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.ServiceName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.ServiceName}
              </TableCell>
              <TableCell align="right">{row.NumberOfTasks}</TableCell>
              <TableCell align="right">{row.TotalLogHours}</TableCell>
            </TableRow>
          ))}
          <TableRow
            sx={{
              gap: "160px",
            }}
          >
            <TableCell>View Tasks</TableCell>
            <TableCell>
              <Link to="/viewalltasksbyservice">
                <IconButton color="secondary">
                  <EastIcon />
                </IconButton>
              </Link>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
