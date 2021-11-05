import { Add } from "@mui/icons-material";
import { Fab, Typography } from "@mui/material";
import Board from "views/taskboard/board";
import { useQuery, UseQueryResult } from "react-query";
import { getTasks } from "api/tasks";
import Loader from "components/Loader";
import { DataResponse } from "types";
import { Box } from "@mui/system";
import CreateTask from "views/taskboard/board/CreateTask";
import { useState } from "react";

function TaskBoard() {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading }: UseQueryResult<DataResponse, Error> = useQuery(
    "tasks",
    getTasks,
    { refetchOnWindowFocus: false }
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
        onClick={() => setOpen(true)}
        size="medium"
        color="secondary"
        sx={{ position: "fixed", bottom: 40, right: 40, borderRadius: "8px" }}
        aria-label="add"
      >
        <Add />
      </Fab>
      <CreateTask open={open} setOpen={setOpen} />
    </Box>
  );
}

export default TaskBoard;
