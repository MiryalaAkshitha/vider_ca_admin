import {
  Autocomplete,
  Checkbox,
  FormControlLabel,
  TextField,
  Box,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import { RecurringStateProps } from "./types";

interface IProps {
  state: RecurringStateProps;
  setState: Dispatch<SetStateAction<RecurringStateProps>>;
  recurringStartDate: React.ReactElement;
  dueDate: React.ReactElement;
  recurringEndDate: React.ReactElement;
  neverExpires: React.ReactElement;
}

function FrequencyDates({
  state,
  setState,
  recurringStartDate,
  dueDate,
  recurringEndDate,
  neverExpires,
}: IProps) {
  // const [neverExpires, setNeverExpires] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Box mt={2}>{recurringStartDate}</Box>
      <Box mt={2}>{dueDate}</Box>
      <Box mt={2}>{recurringEndDate}</Box>
      <Box mt={2}>{neverExpires}</Box>
    </>
  );
}

export default FrequencyDates;
