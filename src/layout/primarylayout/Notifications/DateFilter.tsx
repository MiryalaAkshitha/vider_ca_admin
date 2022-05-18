import { DesktopDatePicker } from "@mui/lab";
import TextField from "@mui/material/TextField";
import { Box } from "@mui/system";
import React from "react";

const DateFilter = () => {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        columnGap: "30px",
      }}
    >
      <DesktopDatePicker
        label="From"
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField size="small" {...params} sx={{ maxWidth: "200px" }} />
        )}
      />
      <DesktopDatePicker
        label="To"
        inputFormat="MM/dd/yyyy"
        value={value}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField size="small" {...params} sx={{ maxWidth: "200px" }} />
        )}
      />
    </Box>
  );
};

export default DateFilter;
