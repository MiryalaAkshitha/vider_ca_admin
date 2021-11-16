import { Add } from "@mui/icons-material";
import { Fab, Typography, Menu, MenuItem, ListItemIcon } from "@mui/material";
import Board from "views/taskboard/board";
import { useQuery, UseQueryResult } from "react-query";
import { getTasks } from "api/tasks";
import Loader from "components/Loader";
import { DataResponse } from "types";
import { Box } from "@mui/system";
import CreateTask from "views/taskboard/board/CreateTask";
import { useState } from "react";
import CreateRecurringTask from "views/taskboard/board/CreateTask/CreateRecurringTask";

function TaskBoard() {
  const [open, setOpen] = useState<boolean>(false);
  const [openRecurring, setOpenRecurring] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data, isLoading }: UseQueryResult<DataResponse, Error> = useQuery(
    "tasks",
    getTasks
  );

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ overflowY: "hidden" }}>
      {data?.data?.length ? (
        <Board data={data?.data} />
      ) : (
        <Box textAlign="center" mt={20}>
          <Typography variant="subtitle1" color="rgba(0,0,0,0.5)">
            No tasks created yet.
          </Typography>
        </Box>
      )}
      <Fab
        onClick={(e) => setAnchorEl(e.currentTarget)}
        size="medium"
        color="secondary"
        sx={{ position: "fixed", bottom: 40, right: 40, borderRadius: "8px" }}
        aria-label="add"
      >
        <Add />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          elevation: 0,
          sx: {
            transform: "translateY(-10px)",
            minWidth: 200,
            py: 1,
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "bottom" }}
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
      >
        <MenuItem sx={{ py: 1, m: 0 }} onClick={() => setOpen(true)}>
          <ListItemIcon>
            <Add color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Create Task</Typography>
        </MenuItem>
        <MenuItem sx={{ py: 1, m: 0 }} onClick={() => setOpenRecurring(true)}>
          <ListItemIcon>
            <Add color="primary" fontSize="small" />
          </ListItemIcon>
          <Typography variant="body2">Create Recurring Task</Typography>
        </MenuItem>
      </Menu>
      <CreateTask open={open} setOpen={setOpen} />
      <CreateRecurringTask open={openRecurring} setOpen={setOpenRecurring} />
    </Box>
  );
}

export default TaskBoard;
