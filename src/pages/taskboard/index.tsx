import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTasks } from "api/services/tasks";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { selectTaskBoard } from "redux/reducers/taskboardSlice";
import { ResType, ViewType } from "types";
import Board from "views/taskboard/board";
import Filters from "views/taskboard/Filters";
import TaskTable from "views/taskboard/table";

function TaskBoard() {
  const { queryParams, setQueryParams } = useQueryParams();
  const view = (queryParams.view as ViewType) || "grid";
  const { search, appliedFilters } = useSelector(selectTaskBoard);

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

  const { data, isLoading }: ResType = useQuery(
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

  return (
    <Box p={2}>
      <Filters />
      {isLoading ? (
        <Loader />
      ) : data?.data?.length ? (
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
      <FloatingButton
        onClick={() => {
          setQueryParams({
            ...queryParams,
            createTask: "true",
          });
        }}
        position="right"
      />
    </Box>
  );
}

export default TaskBoard;
