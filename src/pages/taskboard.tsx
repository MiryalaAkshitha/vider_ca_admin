import { Add } from "@mui/icons-material";
import { Fab } from "@mui/material";
import Board from "views/taskboard/board";
import { useQuery, UseQueryResult } from "react-query";
import { getTasks } from "api/tasks";
import Loader from "components/Loader";
import { DataResponse } from "types";
import { Box } from "@mui/system";

function TaskBoard() {
  const { data, isLoading }: UseQueryResult<DataResponse, Error> = useQuery(
    "categories",
    getTasks
  );

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ overflowY: "hidden" }}>
      <Board data={data?.data} />
      <Fab
        size="medium"
        color="secondary"
        sx={{ position: "fixed", bottom: 40, right: 40, borderRadius: "8px" }}
        aria-label="add"
      >
        <Add />
      </Fab>
    </Box>
  );
}

export default TaskBoard;
