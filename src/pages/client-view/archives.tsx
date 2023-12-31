import { Autocomplete, Box, Button, TextField } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { getFinancialYears } from "utils/getFinancialYears";
import CompletedTasks from "views/client-view/Archives/CompletedTasks";
import DeletedTasks from "views/client-view/Archives/DeletedTasks";
import TerminatedTasks from "views/client-view/Archives/TerminatedTasks";
import { StyledClientFilterItem } from "views/tasks/Filters/styles";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import AllFiltersDialog from "views/tasks/Filters/AllFiltersDialog";

function Archives() {
  const [active, setActive] = useState("completed");
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const [filters, setFilters] = useState({
    completed: {
      financialYear: "",
      search: "",
    },
    terminated: {
      financialYear: "",
      search: "",
    },
    deleted: {
      financialYear: "",
      search: "",
    },
  });

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap="15px" flexWrap="wrap" alignItems="center">
          <StyledClientFilterItem
            variant="body1"
            color="rgba(0,0,0,0.7)"
            active={active === "completed" ? 1 : 0}
            onClick={() => setActive("completed")}
          >
            Completed Tasks
          </StyledClientFilterItem>
          <StyledClientFilterItem
            variant="body1"
            color="rgba(0,0,0,0.7)"
            active={active === "terminated" ? 1 : 0}
            onClick={() => setActive("terminated")}
          >
            Terminated Tasks
          </StyledClientFilterItem>
          <StyledClientFilterItem
            variant="body1"
            color="rgba(0,0,0,0.7)"
            active={active === "deleted" ? 1 : 0}
            onClick={() => setActive("deleted")}
          >
            Deleted Tasks
          </StyledClientFilterItem>
        </Box>
        <Box display="flex" alignItems="center" gap='20px'>
          {/* remove this filter as of now  */}
          {/* <Autocomplete
            disablePortal
            onChange={(_, v) => {
              setFilters({
                ...filters,
                [active]: {
                  ...filters[active],
                  financialYear: v,
                },
              });
            }}
            options={getFinancialYears()}
            value={filters[active].financialYear || ""}
            sx={{ width: 200 }}
            size="small"
            renderInput={(params) => (
              <TextField {...params} label="Financial Year" />
            )}
          /> */}
            <Button
                size="medium"
                startIcon={<FilterAltOutlinedIcon />}
                onClick={() => setOpenFilters(true)}
                color="primary"
                sx={{ border: "1px solid lightgrey", borderRadius: "4px" }}
              >
                Filter
              </Button>
          <SearchContainer
            value={filters[active].search}
            minWidth="350px"
            placeHolder="Search by Task ID | Task Name"
            onChange={(v) => {
              setFilters({
                ...filters,
                [active]: {
                  ...filters[active],
                  search: v,
                },
              });
            }}
          />
        </Box>
      
      </Box>
      {active === "completed" && <CompletedTasks filters={filters[active]} />}
      {active === "terminated" && <TerminatedTasks filters={filters[active]} />}
      {active === "deleted" && <DeletedTasks filters={filters[active]} />}
       {/* <AllFiltersDialog open={openFilters} setOpen={setOpenFilters} /> */}

    </Box>
  );
}

export default Archives;
