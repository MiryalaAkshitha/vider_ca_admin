import React from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EastIcon from "@mui/icons-material/East";

import { useState } from "react";
import {
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  TextField,
  IconButton,
} from "@mui/material";

function createData(TaskID, TaskName, TaskDueDate, OverDueBy) {
  return { TaskID, TaskName, TaskDueDate, OverDueBy };
}

const rows = [
  createData("VD0007", "Task Name 1", "02 july,2022", "12 days"),
  createData("VD0007", "Task Name 1", "02 july,2022", "12 days"),
  createData("VD0007", "Task Name 1", "02 july,2022", "12 days"),
  createData("VD0007", "Task Name 1", "02 july,2022", "12 days"),
  createData("VD0007", "Task Name 1", "02 july,2022", "12 days"),
];
export default function OverdueTable() {
  const [type, setType] = useState<null | string>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Overdue Tasks</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Task ID</TableCell>
            <TableCell align="right">Task name</TableCell>
            <TableCell align="right">Task due date</TableCell>
            <TableCell align="right">Over due by</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.TaskID}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.TaskID}
              </TableCell>
              <TableCell align="right">{row.TaskName}</TableCell>
              <TableCell align="right">{row.TaskDueDate}</TableCell>
              <TableCell align="right">{row.OverDueBy}</TableCell>
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              View Tasks
              <Link to="/viewalloverduetasks">
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
export {};
