import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import React from "react";

export default function ClientFilters() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        width: "100%",
        alignItems: "center",
        marginBottom: "20px",
      }}
    >
      <Box>
        <FormControl sx={{ width: "200px" }}>
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
      <Button variant="outlined" color="secondary">
        Apply
      </Button>
    </Box>
  );
}
