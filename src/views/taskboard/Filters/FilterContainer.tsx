import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCustomDates,
  handleFilters,
  selectTaskBoard,
} from "redux/reducers/taskboardSlice";
import { getTitle } from "utils";

interface FilterProps {
  items: Array<{ label: string; value: string }>;
}

const FilterContainer = ({ items }: FilterProps) => {
  const dispatch = useDispatch();
  const { appliedFilters, selected, selectedFilters } =
    useSelector(selectTaskBoard);

  const onChange = (e: any) => {
    dispatch(
      handleFilters({
        checked: e.target.checked,
        value: e.target.value,
      })
    );
  };

  const onCustomDatesChange = (e: any, dateType: "fromDate" | "toDate") => {
    dispatch(
      handleCustomDates({
        dateType,
        value: e.target.value,
      })
    );
  };

  return (
    <Box minWidth={300}>
      {items.map((item, index: number) => (
        <div key={index}>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked={appliedFilters[selected]?.includes(item.value)}
                value={item.value}
                onChange={(e) => onChange(e)}
              />
            }
            label={getTitle(item.label)}
          />
        </div>
      ))}
      {selectedFilters[selected]?.includes("custom") && (
        <Box mt={1}>
          <TextField
            sx={{ width: "80%" }}
            type="date"
            variant="outlined"
            size="small"
            onChange={(e) => onCustomDatesChange(e, "fromDate")}
            label="From Date"
            value={selectedFilters.customDates[selected].fromDate}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
          <TextField
            sx={{ mt: 2, width: "80%" }}
            type="date"
            variant="outlined"
            size="small"
            onChange={(e) => onCustomDatesChange(e, "toDate")}
            label="To Date"
            value={selectedFilters.customDates[selected].toDate}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
      )}
    </Box>
  );
};

export default FilterContainer;
