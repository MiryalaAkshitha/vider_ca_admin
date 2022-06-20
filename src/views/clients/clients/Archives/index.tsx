import { useEffect, useState } from "react";
import CompletedTasks from "./CompletedTasks";
import TerminatedTasks from "./TerminatedTasks";
import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import { StyledClientFilterItem } from "views/taskboard/Filters/style";
import DeletedTasks from "./DeletedTasks";
import { getFinancialYears } from "utils";

function Archives() {
  const [active, setActive] = useState("completed");
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
        <Box display="flex" gap="15px" alignItems="center">
          <Autocomplete
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
          />
          <SearchContainer
            value={filters[active].search}
            minWidth="350px"
            placeHolder="Search by task ID or task name"
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
    </Box>
  );
}

export default Archives;
