import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Popover,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useState } from "react";
import CustumDates from "./CustumDates";
import EventIcon from "@mui/icons-material/Event";

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

export default function Filters() {
  const [year, setYear] = useState<null | Date>(new Date());
  const [month, setMonth] = useState<null | string>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <Box sx={{ display: "flex", gap: "15.8px", alignItems: "center" }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          views={["year"]}
          label="Select Financial Year"
          value={year}
          onChange={(newValue) => {
            setYear(newValue);
          }}
          renderInput={(params) => <TextField {...params} helperText={null} />}
        />
      </LocalizationProvider>
      <FormControl sx={{ width: "195px" }}>
        <InputLabel id="demo-simple-select-label">Select Month</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={month}
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
      <TextField
        label="Custum Dates"
        InputProps={{
          endAdornment: (
            <IconButton
              aria-describedby={id}
              onClick={(event: any) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <EventIcon />
            </IconButton>
          ),
        }}
        disabled
      />
      <Popover
        open={open}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <CustumDates />
      </Popover>
      <Button variant="contained" color="secondary" sx={{ width: "120px" }}>
        Apply
      </Button>
    </Box>
  );
}
