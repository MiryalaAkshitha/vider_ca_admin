import { DesktopDatePicker } from "@mui/lab";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useState } from "react";

const initialState = {
  fromDate: null,
  toDate: null,
};

const DateFilter = ({ filters, setFilters }) => {
  const [state, setState] = useState<any>({ ...initialState });

  const handleApply = () => {
    setFilters({
      ...filters,
      ...state,
    });
  };

  const handleClear = () => {
    setState({ ...initialState });
    setFilters({ ...initialState });
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid rgba(0, 0, 0, 0.1)",
        gap: 3,
      }}
    >
      <Box display="flex" gap={1} flex={1}>
        <DesktopDatePicker
          label="From"
          inputFormat="MM/dd/yyyy"
          value={state.fromDate}
          onChange={(value) => {
            setState({
              ...state,
              fromDate: value,
            });
          }}
          renderInput={(params) => (
            <TextField fullWidth size="small" {...params} />
          )}
        />
        <DesktopDatePicker
          label="To"
          inputFormat="MM/dd/yyyy"
          value={state.toDate}
          onChange={(value) => {
            setState({
              ...state,
              toDate: value,
            });
          }}
          renderInput={(params) => (
            <TextField fullWidth size="small" {...params} />
          )}
        />
      </Box>
      <Box>
        <Button size="small" sx={{ minWidth: 50 }} onClick={handleApply}>
          Apply
        </Button>
        <Button size="small" sx={{ minWidth: 50 }} onClick={handleClear}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default DateFilter;
