import { Close } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { handleRemove, selectTaskBoard } from "redux/reducers/taskboardSlice";
import { getTitle } from "utils";
import { StyledAppliedFilterItem } from "./styles";

function AppliedFilters() {
  const { appliedFilters } = useSelector(selectTaskBoard);
  const dispatch = useDispatch();

  const onRemoveFilter = (filter: string, filterItemIndex: number) => {
    dispatch(
      handleRemove({
        filter,
        filterItemIndex,
      })
    );
  };

  const customDatesLabel = (filter: string) => {
    let fromDate = appliedFilters.customDates[filter].fromDate;
    let toDate = appliedFilters.customDates[filter].toDate;

    return ` (${moment(fromDate).format("DD MMM YYYY")}
             - ${moment(toDate).format("DD MMM YYYY")})`;
  };

  return (
    <Box display="flex" gap={2}>
      {Object.keys(appliedFilters).map((filter, filterIndex: number) => {
        if (appliedFilters[filter].length > 0) {
          return (
            <Box display="flex" gap={1} alignItems="center" key={filterIndex}>
              <Typography variant="caption">{getTitle(filter)}:</Typography>
              <Box display="flex" gap="4px" alignItems="center">
                {appliedFilters[filter].map(
                  (item: any, filterItemIndex: number) => (
                    <StyledAppliedFilterItem
                      onClick={() => {
                        onRemoveFilter(filter, filterItemIndex);
                      }}
                      key={filterItemIndex}
                    >
                      <Typography variant="body2">
                        {item?.label}
                        {item?.label === "Custom" && customDatesLabel(filter)}
                      </Typography>
                      <Close sx={{ fontSize: "11px" }} />
                    </StyledAppliedFilterItem>
                  )
                )}
              </Box>
            </Box>
          );
        }
        return null;
      })}
    </Box>
  );
}

export default AppliedFilters;
