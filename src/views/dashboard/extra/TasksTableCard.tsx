import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

const TasksTableCard = ({ data }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{ minHeight: 300, position: "relative" }}
    >
      <Table sx={{ p: 2 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            {data?.keys?.map((key: string, index: number) => (
              <TableCell variant="footer" key={index}>
                {key}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.values?.length > 0 ? (
            data?.values?.map((value: any, index: number) => (
              <StyledTableRow key={index}>
                <TableCell component="th" scope="row">
                  {value?.name}
                </TableCell>
                {Object.keys(value?.tasks)?.map((key: any, index: number) => (
                  <TableCell component="th" scope="row" key={index}>
                    {value?.tasks[key]}
                  </TableCell>
                ))}
              </StyledTableRow>
            ))
          ) : (
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <Typography variant="subtitle2" color="grey">
                No Data.
              </Typography>
            </Box>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
export default TasksTableCard;
