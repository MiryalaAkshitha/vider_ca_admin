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
  const { selected, selectedFilters, appliedFilters } =
    useSelector(selectTaskBoard);

  const onChange = (e: any, label: string) => {
    dispatch(
      handleFilters({
        checked: e.target.checked,
        value: {
          label,
          value: e.target.value,
        },
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
                defaultChecked={Boolean(
                  appliedFilters[selected].find(
                    (filter: any) => filter.value === item.value
                  )
                )}
                value={item.value}
                onChange={(e) => onChange(e, getTitle(item.label))}
              />
            }
            label={getTitle(item.label)}
          />
        </div>
      ))}
      {Boolean(
        selectedFilters[selected].find(
          (filter: any) => filter.value === "custom"
        )
      ) && (
        <Box mt={1}>
          <TextField
            sx={{ width: "80%" }}
            type="date"
            variant="outlined"
            size="small"
            onChange={(e) => onCustomDatesChange(e, "fromDate")}
            label="From Date"
            defaultValue={appliedFilters.customDates[selected].fromDate}
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
            defaultValue={appliedFilters.customDates[selected].toDate}
            InputLabelProps={{ shrink: true }}
            fullWidth
          />
        </Box>
      )}
    </Box>
  );
};

export default FilterContainer;
