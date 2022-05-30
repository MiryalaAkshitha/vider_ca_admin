import { FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DrawerWrapper from "components/DrawerWrapper";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import CreateNonRecurringTask from "./CreateNonRecurringTask";
import CreateRecurringTask from "./CreateRecurringTask";

const CreateTask = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const [type, setType] = useState("non_recurring");
  const [selectionType, setSelectionType] = useState("standard");

  return (
    <DrawerWrapper
      open={queryParams.createTask === "true"}
      setOpen={() => {
        delete queryParams.createTask;
        setQueryParams({ ...queryParams });
      }}
      title="Create Task"
    >
      <RadioGroup
        onChange={(e) => setSelectionType(e.target.value)}
        row
        aria-labelledby="selectionType"
        name="type"
        sx={{ mb: 2 }}
        value={selectionType}
      >
        <FormControlLabel
          value="custom"
          control={<Radio />}
          label={<Typography>Custom Service</Typography>}
        />
        <FormControlLabel
          value="standard"
          control={<Radio />}
          label={<Typography>Standard Service</Typography>}
        />
      </RadioGroup>
      <RadioGroup
        onChange={(e) => setType(e.target.value)}
        row
        aria-labelledby="typeOfTask"
        name="type"
        sx={{ mb: 2 }}
        value={type}
      >
        <FormControlLabel
          value="non_recurring"
          control={<Radio />}
          label={<Typography>Non-recurring</Typography>}
        />
        <FormControlLabel
          value="recurring"
          control={<Radio />}
          label={<Typography>Recurring</Typography>}
        />
      </RadioGroup>
      <Box>
        {type === "non_recurring" ? (
          <CreateNonRecurringTask />
        ) : type === "recurring" ? (
          <CreateRecurringTask />
        ) : null}
      </Box>
    </DrawerWrapper>
  );
};

export default CreateTask;
