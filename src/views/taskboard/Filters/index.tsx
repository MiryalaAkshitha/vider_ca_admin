import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Box, Button } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import View from "components/View";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { ViewType } from "types";
import AllFiltersDialog from "./AllFiltersDialog";
import ClientFilter from "./ClientFilter";
import { StyledTasksFilterContainer } from "./style";

function Filters() {
  const { queryParams, setQueryParams } = useQueryParams();
  const view = (queryParams.view as ViewType) || "grid";
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const handleView = (view: ViewType) => {
    setQueryParams({
      ...queryParams,
      view,
    });
  };

  return (
    <Box>
      <StyledTasksFilterContainer>
        <ClientFilter />
        <SearchContainer
          minWidth="400px"
          defaultValue={queryParams.search}
          placeHolder="Search"
          debounced
          onChange={(v) => setQueryParams({ ...queryParams, search: v })}
        />
        <AllFiltersDialog open={openFilters} setOpen={setOpenFilters} />
      </StyledTasksFilterContainer>
      <Box display="flex" gap={3} justifyContent="flex-end" mt={2}>
        <div>
          <Button
            size="small"
            startIcon={<FilterAltOutlinedIcon />}
            onClick={() => setOpenFilters(true)}
            color="primary"
            sx={{ border: "1px solid lightgrey", borderRadius: "4px" }}
          >
            Filters
          </Button>
        </div>
        <View value={view} onChange={handleView} />
      </Box>
    </Box>
  );
}

export default Filters;
