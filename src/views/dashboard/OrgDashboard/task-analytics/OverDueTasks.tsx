import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { getOverdueTasks } from "api/services/organization";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import moment from "moment";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { StyledTaskBox } from "../styles";

function OverDueTasks() {
  const navigate = useNavigate();
  const { queryParams, setQueryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    ["over-due-tasks", { offset: 0, limit: 5, dashboardType }],
    getOverdueTasks
  );

  const handleClick = () => {
    navigate(`/dashboard/over-due-tasks?type=${dashboardType}`);
  };

  if (isLoading) return <Loader />;

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Over Due Tasks</Typography>
      </header>
      <main style={{ padding: 0 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow sx={{ color: "#707070" }}>
              <TableCell>Task Id</TableCell>
              <TableCell>Task Name</TableCell>
              <TableCell>Client Name</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Over Due By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.data?.result?.map((row: any) => (
              <TableRow
                key={row?.name}
                sx={{ cursor: "pointer", "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => navigate(`/task-board/${row?.id}#details`)}
              >
                <TableCell>
                  <Typography variant="caption">{row?.taskNumber}</Typography>
                </TableCell>
                <TableCell sx={{ width: 200 }}>
                  <Typography variant="caption"> {row?.name}</Typography>
                </TableCell>
                <TableCell sx={{ width: 200 }}>
                  <Typography variant="caption"> {row?.client?.displayName}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {moment(row?.dueDate).format("DD MMM YYYY")}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="caption">
                    {moment().diff(row?.dueDate, "days") + " days"}
                  </Typography>
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
        <IconButton color="secondary" size="small" onClick={handleClick}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </footer>
    </StyledTaskBox>
  );
}

export default OverDueTasks;
