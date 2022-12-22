import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export default function Filters() {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "20px",
        width: "100%",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Client</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={month}
            label="Select Client"
            // onChange={(e) => {
            //   setMonth(e.target.value);
            // }}
          >
            {/* <MenuItem value={10}>10</MenuItem>; */}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Select Members</InputLabel>
          <Select
            multiple
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            // value={month}
            label="Select Members"
            // onChange={(e) => {
            //   setMonth(e.target.value);
            // }}
          >
            {/* <MenuItem value={10}>10</MenuItem>; */}
          </Select>
        </FormControl>
      </Box>
      <Button variant="outlined" color="secondary">
        Apply
      </Button>
    </Box>
  );
}
