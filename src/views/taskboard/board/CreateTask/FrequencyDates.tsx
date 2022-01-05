import { Autocomplete, TextField } from "@mui/material";
import React, { Dispatch, SetStateAction } from "react";
import { RecurringStateProps } from "./types";

interface IProps {
  state: RecurringStateProps;
  setState: Dispatch<SetStateAction<RecurringStateProps>>;
}

function FrequencyDates({ state, setState }: IProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <TextField
        sx={{ mt: 3 }}
        variant="outlined"
        fullWidth
        onChange={handleChange}
        size="small"
        required
        type="date"
        value={state.recurringStartDate || ""}
        InputLabelProps={{ shrink: true }}
        label="Recurring Start Date"
        name="recurringStartDate"
      />
      <Autocomplete
        id="tags-standard"
        onChange={(_, value) => {
          setState({
            ...state,
            dueDay: value,
          });
        }}
        options={Array.from(Array(31), (v, i) => i + 1)}
        sx={{ mt: 3 }}
        getOptionLabel={(option: any) => option.toString()}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            required
            size="small"
            fullWidth
            label="Due Day"
          />
        )}
      />
      <TextField
        sx={{ mt: 3 }}
        variant="outlined"
        fullWidth
        onChange={handleChange}
        size="small"
        type="date"
        value={state.recurringEndDate || ""}
        InputLabelProps={{ shrink: true }}
        label="Recurring End Date"
        name="recurringEndDate"
      />
    </>
  );
}

export default FrequencyDates;