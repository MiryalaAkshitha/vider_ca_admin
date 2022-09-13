import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Box, Button } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import View from "components/View";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleSearch, selectTaskBoard } from "redux/reducers/taskboardSlice";
import { ViewType } from "types";
import AllFiltersDialog from "./AllFiltersDialog";
import AppliedFilters from "./ApplidedFilters";
import ClientFilter from "./ClientFilter";
import { StyledTasksFilterContainer } from "./styles";

function Filters() {
  const dispatch = useDispatch();
  const { queryParams, setQueryParams } = useQueryParams();
  const view = (queryParams.view as ViewType) || "grid";
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const { search } = useSelector(selectTaskBoard);

  const handleView = (view: ViewType) => {
    setQueryParams({
      ...queryParams,
      view,
    });
  };

  return (
    <>
      <StyledTasksFilterContainer>
        <ClientFilter />
        <SearchContainer
          minWidth="400px"
          value={search}
          debounced
          placeHolder="Search"
          onChange={(v) => dispatch(handleSearch(v))}
          />
      </StyledTasksFilterContainer>
      <Box display="flex" gap={3} justifyContent="space-between" mt={2}>
        <AppliedFilters />
        <Box display="flex" gap={3} alignItems="center">
          <div>
            <Button
              size="small"
              startIcon={<FilterAltOutlinedIcon />}
              onClick={() => setOpenFilters(true)}
              color="primary"
              sx={{ border: "1px solid lightgrey", borderRadius: "4px" }}
            >
              Filter
            </Button>
          </div>
          <View value={view} onChange={handleView} />
        </Box>
      </Box>
      <AllFiltersDialog open={openFilters} setOpen={setOpenFilters} />
    </>
  );
}

export default Filters;
