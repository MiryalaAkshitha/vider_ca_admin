import { Alert, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTasks } from "api/services/tasks/tasks";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectTaskBoard } from "redux/reducers/taskboardSlice";
import { ResType, ViewType } from "types";
import { Permissions } from "data/permissons";
import Board from "views/tasks/board";
import CreateTask from "views/tasks/board/CreateTask";
import Filters from "views/tasks/Filters";
import TaskTable from "views/tasks/table";
import { handleError } from "utils/handleError";

function Tasks() {
  const { queryParams } = useQueryParams();
  const view = (queryParams.view as ViewType) || "grid";
  const { search, appliedFilters } = useSelector(selectTaskBoard);
  const [open, setOpen] = useState(false);

  const getFiltersData = () => {
    let result = {};
    let { customDates, ...remFilters } = appliedFilters;

    Object.keys(remFilters).forEach((key) => {
      result[key] = remFilters[key].map((item: any) => item.value);
    });

    return {
      ...result,
      customDates,
    };
  };

  const { data, isLoading, error }: ResType = useQuery(
    [
      "tasks",
      {
        client: queryParams.client,
        search: search,
        ...getFiltersData(),
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
    <Box px={2} pt={2}>
      <Filters />
      {isLoading ? (
        <Loader />
      ) : data?.data?.length ? (
        <>{view === "grid" ? <Board data={data.data} /> : <TaskTable data={data.data} />}</>
      ) : (
        <Box textAlign="center" mt={20}>
          <Typography variant="subtitle1" color="rgba(0,0,0,0.5)">
            No tasks created yet.
          </Typography>
        </Box>
      )}
      <ValidateAccess name={Permissions.CREATE_TASK}>
        <FloatingButton
          onClick={() => {
            setOpen(true);
          }}
          position="right"
        />
      </ValidateAccess>
      <CreateTask open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Tasks;
