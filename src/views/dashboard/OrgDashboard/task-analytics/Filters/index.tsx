import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";

const ALL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function Filters() {
  const [year, setYear] = useState<null | Date>(new Date());
  const [month, setMonth] = useState<null | string>(null);

  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={["year"]}
          label="Select Financial Year"
          value={year}
          onChange={(newValue) => {
            setYear(newValue);
          }}
          renderInput={(params) => <TextField {...params} size="small" />}
        />
      </LocalizationProvider>
      <FormControl sx={{ width: "180px" }}>
        <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
        <Select
          value={month}
          size="small"
          label="Select Month"
          onChange={(e) => {
            setMonth(e.target.value);
          }}
        >
          {ALL_MONTHS.map((mon) => {
            return <MenuItem value={mon}>{mon}</MenuItem>;
          })}
        </Select>
      </FormControl>
      <Button variant="contained" color="secondary" sx={{ width: "120px" }}>
        Apply
      </Button>
    </Box>
  );
}

export default Filters;
