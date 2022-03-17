import React, { useState } from "react";
import DrawerWrapper from "components/DrawerWrapper";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import CreateTask from ".";
import CreateRecurringTask from "./CreateRecurringTask";

const MainCreateTaskDrawer = ({ open, setOpen }) => {
  const [type, setType] = useState("task");

  return (
    <>
      <DrawerWrapper open={open} setOpen={setOpen} title="Create Task">
        <FormControl
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <FormLabel id="type" sx={{ marginRight: "10px" }}>
            <Typography>Type Of Task : </Typography>
          </FormLabel>
          <RadioGroup
            onChange={(e) => setType(e.target.value)}
            row
            aria-labelledby="typeOfTask"
            name="type"
            value={type}
          >
            <FormControlLabel
              value="task"
              control={<Radio />}
              label={<Typography>Task</Typography>}
            />
            <FormControlLabel
              value="recurring"
              control={<Radio />}
              label={<Typography>Recurring Task</Typography>}
            />
          </RadioGroup>
        </FormControl>
        <Box>
          {type === "task" ? (
            <CreateTask open={open} setOpen={setOpen} />
          ) : type === "recurring" ? (
            <CreateRecurringTask open={open} setOpen={setOpen} />
          ) : null}
        </Box>
      </DrawerWrapper>
    </>
  );
};

export default MainCreateTaskDrawer;
