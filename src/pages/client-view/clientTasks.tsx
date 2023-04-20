import { Alert, Button } from "@mui/material";
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
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AppliedFilters from "views/tasks/Filters/ApplidedFilters";
import { useDispatch, useSelector } from "react-redux";
import { handleSearch, selectTaskBoard } from "redux/reducers/taskboardSlice";
import AllFiltersDialog from "views/tasks/Filters/AllFiltersDialog";


function ClientTasks() {
  const { clientId } = useParams();
  const [search, setSearch] = useState("");
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const { appliedFilters } = useSelector(selectTaskBoard);

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

  if (error) {
    return (
      <Alert sx={{ maxWidth: 500, margin: "auto", mt: 5 }} severity="error">
        {handleError(error)}
      </Alert>
    );
  }

  return (
    <Box p={2}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
      <Button
                size="medium"
                startIcon={<FilterAltOutlinedIcon />}
                onClick={() => setOpenFilters(true)}
                color="primary"
                sx={{ border: "1px solid lightgrey", borderRadius: "4px", marginRight: "40px" }}
              >
                Filter
              </Button>
        
          <SearchContainer
            minWidth="400px"
            value={search}
            debounced
            placeHolder="Search by Task Name"
            onChange={setSearch}
          />
          
      </Box>
      {isLoading ? <Loader /> : <TaskTable data={data.data} />}
      {/* <AllFiltersDialog open={openFilters} setOpen={setOpenFilters} /> */}
    </Box>
  );
}

export default ClientTasks;
