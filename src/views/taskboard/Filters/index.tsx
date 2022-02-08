import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Box, Button } from "@mui/material";
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
    <StyledTasksFilterContainer>
      <ClientFilter />
      <Box display="flex" gap={5}>
        <Box display="flex" gap={2}>
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
        </Box>
        <View value={view} onChange={handleView} />
      </Box>
      <AllFiltersDialog open={openFilters} setOpen={setOpenFilters} />
    </StyledTasksFilterContainer>
  );
}

export default Filters;
