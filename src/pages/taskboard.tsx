import { Add } from "@mui/icons-material";
import { Fab, ListItemIcon, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTasks } from "api/services/tasks";
import Loader from "components/Loader";
import MenuWrapper from "components/MenuWrapper";
import View from "components/View";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import Board from "views/taskboard/board";
import CreateTask from "views/taskboard/board/CreateTask";
import CreateRecurringTask from "views/taskboard/board/CreateTask/CreateRecurringTask";
import Filters from "views/taskboard/Filters";
import TaskTable from "views/taskboard/table";

type ViewType = "grid" | "list";

function TaskBoard() {
  const { queryParams, setQueryParams } = useQueryParams();
  const view = (queryParams.view as ViewType) || "grid";
  const [open, setOpen] = useState<boolean>(false);
  const [openRecurring, setOpenRecurring] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { data, isLoading }: ResType = useQuery(
    [
      "tasks",
      {
        client: queryParams.client,
      },
    ],
    getTasks
  );

  const handleView = (view: ViewType) => {
    setQueryParams({
      ...queryParams,
      view,
    });
  };

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ overflowY: "hidden", p: 2 }}>
      <Filters />
      <View value={view} onChange={handleView} />
      {data?.data?.length ? (
        <>
          {view === "grid" ? (
            <Board data={data.data} />
          ) : (
            <TaskTable data={data.data} />
          )}
        </>
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
      <MenuWrapper
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
        type="bottom-right"
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
      </MenuWrapper>
      <CreateTask open={open} setOpen={setOpen} />
      <CreateRecurringTask open={openRecurring} setOpen={setOpenRecurring} />
    </Box>
  );
}

export default TaskBoard;
