import * as React from "react";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DesktopDatePicker } from "@mui/lab";
import { Box } from "@mui/system";

function NotificationsDatePicker() {
  const [value, setValue] = React.useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
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
    </LocalizationProvider>
  );
}
export default NotificationsDatePicker;
