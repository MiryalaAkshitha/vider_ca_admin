import { Alert } from "@mui/material";
import { Box } from "@mui/system";
import { getTasks } from "api/services/tasks/tasks";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import TaskTable from "views/tasks/table";

function ClientTasks() {
  const { clientId } = useParams();
  const [search, setSearch] = useState("");

  const { data, isLoading, error }: ResType = useQuery(
    [
      "tasks",
      {
        client: clientId,
        search: search,
      },
    ],
    getTasks
  );

  if (error) {
    return (
      <Alert sx={{ maxWidth: 500, margin: "auto", mt: 5 }} severity="error">
        {handleError(error)}
      </Alert>
    );
  }

  return (
    <Box p={2}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", paddingRight: "2px" }}>
        <div>
          <SearchContainer
            minWidth="400px"
            value={search}
            debounced
            placeHolder="Search"
            onChange={setSearch}
          />
        </div>
      </Box>
      {isLoading ? <Loader /> : <TaskTable data={data.data} />}
    </Box>
  );
}

export default ClientTasks;
