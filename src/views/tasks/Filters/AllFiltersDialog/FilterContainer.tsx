import { DatePicker } from "@mui/lab";
import { Box, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleCustomDates, handleFilters, selectTaskBoard } from "redux/reducers/taskboardSlice";
import { getTitle } from "utils";

interface FilterProps {
  items: Array<{ label: string; value: string }>;
}

const FilterContainer = ({ items }: FilterProps) => {
  const dispatch = useDispatch();
  const { selected, selectedFilters } = useSelector(selectTaskBoard);

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

  return (
    <Box minWidth={300}>
      {items.map((item, index: number) => (
        <div key={index}>
          <FormControlLabel
            control={
              <Checkbox
                checked={Boolean(
                  selectedFilters[selected].find((filter: any) => filter.value === item.value)
                )}
                value={item.value}
                onChange={(e) => onChange(e, getTitle(item.label))}
              />
            }
            label={getTitle(item.label)}
          />
        </div>
      ))}
      {Boolean(selectedFilters[selected].find((filter: any) => filter.value === "custom")) && (
        <Box mt={1}>
          <DatePicker
            label="From Date"
            inputFormat="dd-MM-yyyy"
            value={selectedFilters.customDates[selected].fromDate}
            onChange={(v) => {
              dispatch(
                handleCustomDates({
                  dateType: "fromDate",
                  value: v,
                })
              );
            }}
            renderInput={(params) => <TextField {...params} fullWidth size="small" />}
          />
          <DatePicker
            label="To Date"
            inputFormat="dd-MM-yyyy"
            disabled={!selectedFilters.customDates[selected].fromDate}
            value={selectedFilters.customDates[selected].toDate}
            minDate={selectedFilters.customDates[selected].fromDate}
            onChange={(v) => {
              dispatch(
                handleCustomDates({
                  dateType: "toDate",
                  value: v,
                })
              );
            }}
            renderInput={(params) => (
              <TextField sx={{ mt: 2 }} {...params} fullWidth size="small" />
            )}
          />
        </Box>
      )}
    </Box>
  );
};

export default FilterContainer;
