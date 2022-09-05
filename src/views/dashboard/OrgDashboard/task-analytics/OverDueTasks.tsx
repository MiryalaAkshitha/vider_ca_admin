import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { StyledTaskBox } from "../styles";

function createData(ServiceName, NumberOfTasks, TotalLogHours) {
  return { ServiceName, NumberOfTasks, TotalLogHours };
}

const rows = [
  createData("Form 49B: Application For Allotment Of TAN", "04-10%", "09hr:30min"),
  createData("Form 49B: Application For Allotment Of TAN", "04-10%", "09hr:30min"),
  createData("Form 49B: Application For Allotment Of TAN", "04-10%", "09hr:30min"),
  createData("Form 49B: Application For Allotment Of TAN", "04-10%", "09hr:30min"),
  createData("Form 49B: Application For Allotment Of TAN", "04-10%", "09hr:30min"),
];

function OverDueTasks() {
  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Over Due Tasks</Typography>
      </header>
      <main style={{ padding: 0 }}>
        <Table aria-label="simple table">
          <TableHead>
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
          </TableBody>
        </Table>
      </main>
      <footer>
        <Typography variant="body2" color="secondary">
          View Tasks
        </Typography>
        <IconButton color="secondary" size="small">
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </footer>
    </StyledTaskBox>
  );
}

export default OverDueTasks;
