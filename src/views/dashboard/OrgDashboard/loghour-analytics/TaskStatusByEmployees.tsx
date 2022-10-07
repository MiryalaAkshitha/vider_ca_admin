import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getEmployeeTasksByStatus } from "api/services/organization";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import DateRange from "../DateRange";
import { StyledTaskBox } from "../styles";

function TaskStatusByEmployees() {
  const navigate = useNavigate();
  const [dates, setDates] = useState({ fromDate: null, toDate: null });
  const { queryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    ["employee-tasks-by-status", { offset: 0, limit: 10, dashboardType, ...dates }],
    getEmployeeTasksByStatus
  );

  if (isLoading) return <Loader />;

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Task status by employees</Typography>
        <Box>
          <DateRange dates={dates} setDates={setDates} />
        </Box>
      </header>
      <main style={{ padding: 0 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ color: "#707070" }}>
              <TableCell>Employee Name</TableCell>
              <TableCell>Todo Tasks</TableCell>
              <TableCell>In Progress Tasks</TableCell>
              <TableCell>On Hold Tasks</TableCell>
              <TableCell>Under Review Tasks</TableCell>
              <TableCell>Done Tasks</TableCell>
              <TableCell>Total Tasks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.result?.map((row: any, index: number) => (
              <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell>
                  <Typography variant="caption">{row?.fullName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{row?.todo}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{row?.inProgress}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{row?.onHold}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{row?.underReview}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{row?.done}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {+row?.todo + +row?.inProgress + +row?.onHold + +row?.underReview + +row?.done}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      {dashboardType === "admin" && (
        <footer>
          <Typography variant="body2" color="secondary">
            View All
          </Typography>
          <IconButton
            color="secondary"
            size="small"
            onClick={() => navigate(`employee-tasks-by-status?type=${dashboardType}`)}
          >
            <ArrowForwardIcon fontSize="small" />
          </IconButton>
        </footer>
      )}
    </StyledTaskBox>
  );
}

export default TaskStatusByEmployees;
