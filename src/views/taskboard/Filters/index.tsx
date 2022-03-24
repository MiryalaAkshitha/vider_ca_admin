import { Close } from "@mui/icons-material";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { Box, Button, Typography } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import View from "components/View";
import useQueryParams from "hooks/useQueryParams";
import moment from "moment";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleRemove,
  handleSearch,
  selectTaskBoard,
} from "redux/reducers/taskboardSlice";
import { ViewType } from "types";
import { getTitle } from "utils";
import AllFiltersDialog from "./AllFiltersDialog";
import ClientFilter from "./ClientFilter";
import { StyledTasksFilterContainer } from "./style";

function Filters() {
  const dispatch = useDispatch();
  const { queryParams, setQueryParams } = useQueryParams();
  const view = (queryParams.view as ViewType) || "grid";
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const { search, appliedFilters } = useSelector(selectTaskBoard);

  const handleView = (view: ViewType) => {
    setQueryParams({
      ...queryParams,
      view,
    });
  };

  const onRemoveFilter = (filter: string, filterItemIndex: number) => {
    dispatch(
      handleRemove({
        filter,
        filterItemIndex,
      })
    );
  };

  return (
    <>
      <StyledTasksFilterContainer>
        <ClientFilter />
        <SearchContainer
          minWidth="400px"
          defaultValue={search}
          debounced
          placeHolder="Search"
          onChange={(v) => {
            dispatch(handleSearch(v));
          }}
        />
      </StyledTasksFilterContainer>
      <Box display="flex" gap={3} justifyContent="space-between" mt={2}>
        <Box display="flex" gap={2}>
          {Object.keys(appliedFilters).map((filter, filterIndex: number) => {
            if (appliedFilters[filter].length > 0) {
              return (
                <Box
                  display="flex"
                  gap={1}
                  alignItems="center"
                  key={filterIndex}
                >
                  <Typography variant="caption">{getTitle(filter)}:</Typography>
                  <Box display="flex" gap="4px" alignItems="center">
                    {appliedFilters[filter].map(
                      (item: any, filterItemIndex: number) => (
                        <Box
                          onClick={() => {
                            onRemoveFilter(filter, filterItemIndex);
                          }}
                          key={filterItemIndex}
                          sx={{
                            display: "flex",
                            gap: 2,
                            background: "white",
                            border: "1px solid rgba(0,0,0,0.1)",
                            borderRadius: "4px",
                            boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                            px: 1,
                            py: "2px",
                            justifyContent: "space-between",
                            alignItems: "center",
                            cursor: "pointer",
                          }}
                        >
                          <Typography variant="body2">
                            {item?.label}
                            {item?.label === "Custom" &&
                              ` (${moment(
                                appliedFilters.customDates[filter].fromDate
                              ).format("DD MMM YYYY")}
                              -${moment(
                                appliedFilters.customDates[filter].toDate
                              ).format("DD MMM YYYY")})`}
                          </Typography>
                          <Close sx={{ fontSize: "11px" }} />
                        </Box>
                      )
                    )}
                  </Box>
                </Box>
              );
            }
            return null;
          })}
        </Box>
        <Box display="flex" gap={3} alignItems="center">
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
      <AllFiltersDialog open={openFilters} setOpen={setOpenFilters} />
    </>
  );
}

export default Filters;
