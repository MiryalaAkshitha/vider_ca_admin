import React from "react";
import { useState } from "react";
import profile from "../../../assets/images/profile.jpg";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import EventIcon from "@mui/icons-material/Event";
import EastIcon from "@mui/icons-material/East";

import {
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";

function createData(
  EmployeeName,
  Role,
  LogHours,
  ToDoTask,
  InProgressTask,
  OnHold,
  UnderReviewTask,
  DoneTask
) {
  return {
    EmployeeName,
    Role,
    LogHours,
    ToDoTask,
    InProgressTask,
    OnHold,
    UnderReviewTask,
    DoneTask,
  };
}

const rows = [
  createData(
    "Nicholas Holland",
    "Developer",
    "09hr:30min",
    "30-10%",
    "25-10%",
    "5+10%",
    "5+10%",
    "5+10%"
  ),
  createData(
    "Nicholas Holland",
    "Developer",
    "09hr:30min",
    "30-10%",
    "25-10%",
    "5+10%",
    "5+10%",
    "5+10%"
  ),
  createData(
    "Nicholas Holland",
    "Developer",
    "09hr:30min",
    "30-10%",
    "25-10%",
    "5+10%",
    "5+10%",
    "5+10%"
  ),
  createData(
    "Nicholas Holland",
    "Developer",
    "09hr:30min",
    "30-10%",
    "25-10%",
    "5+10%",
    "5+10%",
    "5+10%"
  ),
  createData(
    "Nicholas Holland",
    "Developer",
    "09hr:30min",
    "30-10%",
    "25-10%",
    "5+10%",
    "5+10%",
    "5+10%"
  ),
];
const TYPES = [
  { name: "Last Day", color: "#58094F" },
  { name: "7 Days", color: "#F3AA20" },
  { name: "15 Days", color: "#346B6D" },
  { name: "30 Days", color: "#346B6D" },
];
export default function TaskByStatusTable() {
  const [type, setType] = useState<null | string>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Task Status by Employees</TableCell>

            <TableCell align="right">
              <FormControl sx={{ width: "195px" }}>
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
            <TableCell align="right">
              <Button variant="outlined" color="secondary">
                Apply
              </Button>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">Employee Name</TableCell>
            <TableCell align="right">Role</TableCell>
            <TableCell align="right">Log Hours</TableCell>
            <TableCell align="right">To Do Tasks</TableCell>
            <TableCell align="right">InProgress Tasks</TableCell>
            <TableCell align="right">OnHold</TableCell>
            <TableCell align="right">Under Review Task</TableCell>
            <TableCell align="right">Done Task</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow>
              <TableCell align="right">{row.EmployeeName}</TableCell>
              <TableCell align="right">{row.Role}</TableCell>
              <TableCell align="right">{row.LogHours}</TableCell>
              <TableCell align="right">{row.ToDoTask}</TableCell>
              <TableCell align="right">{row.InProgressTask}</TableCell>
              <TableCell align="right">{row.OnHold}</TableCell>
              <TableCell align="right">{row.UnderReviewTask}</TableCell>
              <TableCell align="right">{row.DoneTask}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell align="right" sx={{ color: "#D31701" }}>
              View All Users
              <IconButton color="secondary">
                <EastIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
