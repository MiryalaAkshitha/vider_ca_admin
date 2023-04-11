import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getTasksByService } from "api/services/organization";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getDuration } from "utils/getDuration";
import DateRange from "../DateRange";
import { StyledTaskBox } from "../styles";

function TasksByService() {
  const navigate = useNavigate();
  const [dates, setDates] = useState({ fromDate: null, toDate: null });
  const { queryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    ["task-by-service", { offset: 0, limit: 10, dashboardType, ...dates }],
    getTasksByService
  );

  if (isLoading) return <Loader />;

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Tasks by Service</Typography>
        <Box>
          <DateRange dates={dates} setDates={setDates} />
        </Box>
      </header>
      <main style={{ padding: 0 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ color: "#707070" }}>
              <TableCell>Service Name</TableCell>
              <TableCell>Number of tasks</TableCell>
              <TableCell>Total Log Hours</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.result?.map((row) => (
              <TableRow key={row?.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  <Typography variant="caption"> {row?.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption"> {row?.count}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">{getDuration(row?.totalLogHours)}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </main>
      <footer>
        <Typography variant="body2" color="secondary">
          View Tasks
        </Typography>
        <IconButton
          color="secondary"
          size="small"
          onClick={() => navigate(`/dashboard/tasks-by-service?type=${dashboardType}`)}
        >
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </footer>
    </StyledTaskBox>
  );
}

export default TasksByService;
