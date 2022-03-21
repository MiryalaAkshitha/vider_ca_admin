import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import {
  Button,
  Checkbox,
  Dialog,
  Divider,
  Grid,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getInvoicingTasks } from "api/services/invoicing";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectInvoice } from "redux/reducers/createInvoiceSlice";
import { ResType } from "types";

const taskHeadings = [
  "Task Category",
  "Task Name (Task ID)",
  "Task Status",
  "Team members",
];

const taskData = [
  {
    category: "GST",
    taskName: "GST Login",
    status: "On - Hold",
    members: 2,
  },
  {
    category: "IT",
    taskName: "Income Tax",
    status: "IN - Progress",
    members: 1,
  },
  {
    category: "GST",
    taskName: "GST Login",
    status: "On - Hold",
    members: 2,
  },
];

const CheckboxStates = taskData.map(() => false);

const SelectTaskDialog = ({ open, setOpen, addTask }) => {
  const { client } = useSelector(selectInvoice);
  function handleClose() {
    setOpen(false);
  }

  const { data, isLoading }: ResType = useQuery(
    [
      "invocing-tasks",
      {
        client: client,
      },
    ],
    getInvoicingTasks,
    { enabled: open }
  );

  function handleAddTask() {
    addTask();
    setOpen(false);
  }

  const [searchString, setSearchString] = useState("");
  const [selectAll, setSelectAll] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState(CheckboxStates);

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth={true}
        maxWidth={"lg"}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            padding: "10px 20px",
          }}
        >
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="subtitle2">Unbilled Tasks</Typography>
            <Button sx={{ minWidth: 80 }} size="small" onClick={handleClose}>
              Cancle
            </Button>
          </Box>
        </Box>
        <Divider />
        <Grid container sx={{ padding: "10px 20px" }}>
          <Grid item xs={6} sx={{ margin: "20px 0" }}>
            <TextField
              fullWidth
              id="particulars"
              label={<Typography>Search for a task</Typography>}
              variant="outlined"
              value={searchString}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              margin: "20px 0",
            }}
          >
            <TableContainer component={Paper}>
              <Table sx={{ tableLayout: "fixed", emptyCells: "hide" }}>
                <TableHead>
                  <TableRow>
                    {taskHeadings.map((row, index) => {
                      return (
                        <TableCell key={index}>
                          <Typography sx={{ fontWeight: "bold" }}>
                            {index === 0 ? (
                              <Checkbox
                                sx={{ padding: "0", marginRight: "3px" }}
                                color="secondary"
                                checked={selectAll}
                                onChange={() => {
                                  setSelectAll(!selectAll);
                                  setSelectedTasks([
                                    ...selectedTasks.map(() => !selectAll),
                                  ]);
                                }}
                              />
                            ) : null}
                            {row}
                          </Typography>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {taskData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <Box sx={{ display: "flex" }}>
                          <Checkbox
                            sx={{ padding: "0", marginRight: "3px" }}
                            color="secondary"
                            checked={selectedTasks[index]}
                            onChange={() => {
                              setSelectedTasks([
                                ...selectedTasks.map((checked, i) =>
                                  index === i ? !checked : checked
                                ),
                              ]);
                            }}
                          />
                          <Typography>{row.category}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.taskName}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>{row.status}</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography>
                          <AccountCircleIcon color="disabled" />
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Button
            color="secondary"
            variant="contained"
            sx={{ padding: "12px 120px", margin: "30px auto" }}
            onClick={handleAddTask}
          >
            <Typography>Select Task</Typography>
          </Button>
        </Grid>
      </Dialog>
    </>
  );
};

export default SelectTaskDialog;
