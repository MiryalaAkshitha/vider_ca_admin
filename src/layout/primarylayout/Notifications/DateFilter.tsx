import { DesktopDatePicker } from "@mui/lab";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import { useState } from "react";

const DateFilter = ({ filters, setFilters }) => {
  const [state, setState] = useState<any>({
    fromDate: new Date(),
    toDate: new Date(),
  });

  const handleApply = () => {
    setFilters({
      ...filters,
      ...state,
    });
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
      }}
    >
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
      <Button onClick={handleApply}>Apply</Button>
    </Box>
  );
};

export default DateFilter;
