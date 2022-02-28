import { useState } from "react";
import CompletedTasks from "./CompletedTasks";
import TerminatedTasks from "./TerminatedTasks";
import { Box, TextField } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import { StyledClientFilterItem } from "views/taskboard/Filters/style";

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
  });

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap="15px" flexWrap="wrap" alignItems="center">
          <StyledClientFilterItem
            variant="body1"
            color="rgba(0,0,0,0.7)"
            active={(active === "completed")?.toString()}
            onClick={() => setActive("completed")}
          >
            Completed Tasks
          </StyledClientFilterItem>
          <StyledClientFilterItem
            variant="body1"
            color="rgba(0,0,0,0.7)"
            active={(active === "terminated")?.toString()}
            onClick={() => setActive("terminated")}
          >
            Terminated Tasks
          </StyledClientFilterItem>
        </Box>
        <Box display="flex" gap="15px" alignItems="center">
          <TextField
            sx={{ minWidth: 100 }}
            size="small"
            select
            value={filters[active].financialYear}
            onChange={(e) => {
              setFilters({
                ...filters,
                [active]: {
                  ...filters[active],
                  financialYear: e.target.value,
                },
              });
            }}
            InputLabelProps={{ shrink: true }}
            label="Financial year"
            SelectProps={{ native: true }}
          >
            <option value="">None</option>
            {Array.from(Array(50).keys()).map((_, index) => (
              <option value={`${2000 + index}-${2000 + index + 1}`} key={index}>
                {2000 + index}-{2000 + index + 1}
              </option>
            ))}
          </TextField>
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
    </Box>
  );
}

export default Archives;
