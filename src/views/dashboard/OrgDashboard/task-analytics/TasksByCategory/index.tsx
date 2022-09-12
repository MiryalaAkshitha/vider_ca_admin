import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { useState } from "react";
import DateRange from "../../DateRange";
import { StyledTaskBox } from "../../styles";
import ClientCategory from "./ClientCategory";
import ServiceCategory from "./ServiceCategory";

function TasksByCategory() {
  const [dates, setDates] = useState({ fromDate: null, toDate: null });
  const [type, setType] = useState("task");

  return (
    <StyledTaskBox>
      <header>
        <Box display="flex" gap={2}>
          <Typography variant="subtitle2" color="primary">
            Tasks by Category
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span
              style={{ width: 10, height: 10, background: "#0D47A1", borderRadius: "50%" }}
            ></span>
            <Typography variant="caption">Recurring Tasks</Typography>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <span
              style={{ width: 10, height: 10, background: "#64B5F6", borderRadius: "50%" }}
            ></span>
            <Typography variant="caption">Non-Recurring Tasks</Typography>
          </Box>
        </Box>
        <Box display="flex" gap={1}>
          <TextField size="small" select value={type} onChange={(e) => setType(e.target.value)}>
            <MenuItem value="task">Service Category</MenuItem>
            <MenuItem value="client">Client Category</MenuItem>
          </TextField>
          <DateRange dates={dates} setDates={setDates} />
        </Box>
      </header>
      <main>
        {type === "task" && <ServiceCategory dates={dates} />}
        {type === "client" && <ClientCategory dates={dates} />}
      </main>
    </StyledTaskBox>
  );
}

export default TasksByCategory;
