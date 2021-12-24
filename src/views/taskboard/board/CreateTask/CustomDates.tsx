import useSnack from "hooks/useSnack";
import { Add, Delete } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, SetStateAction, useState } from "react";
import { InputChangeType } from "types";
import { StyledDates } from "views/taskboard/styles";
import { RecurringStateProps } from "./types";

interface IProps {
  state: RecurringStateProps;
  setState: Dispatch<SetStateAction<RecurringStateProps>>;
}

interface IState {
  startDate: string;
  dueDate: string;
}

const CustomDates = ({ state, setState }: IProps) => {
  const snack = useSnack();
  const [customDates, setCustomDates] = useState<IState>({
    startDate: "",
    dueDate: "",
  });

  const handleCustomDateChange = (e: InputChangeType) => {
    setCustomDates({
      ...customDates,
      [e.target.name]: e.target.value,
    });
  };

  const addCustomDate = () => {
    const { startDate, dueDate } = customDates;
    if (!startDate || !dueDate) {
      snack.error("Please enter start date and due date");
      return;
    }
    setState({
      ...state,
      customDates: [...state.customDates, customDates],
    });
  };

  const deleteCustomDate = (index: number) => {
    const newCustomDates = [...state.customDates];
    newCustomDates.splice(index, 1);
    setState({ ...state, customDates: newCustomDates });
  };

  return (
    <>
      {state.customDates.map((item, index) => (
        <StyledDates index={index} key={index}>
          <Box gap={1} display="flex" sx={{ paddingLeft: "30px" }}>
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleCustomDateChange}
              size="small"
              type="date"
              disabled
              value={item.startDate || ""}
              InputLabelProps={{ shrink: true }}
              label="Start Date"
              name="startDate"
            />
            <TextField
              variant="outlined"
              fullWidth
              onChange={handleCustomDateChange}
              size="small"
              type="date"
              disabled
              value={item.dueDate || ""}
              InputLabelProps={{ shrink: true }}
              label="Due Date"
              name="dueDate"
            />
            <div>
              <IconButton onClick={() => deleteCustomDate(index)}>
                <Delete />
              </IconButton>
            </div>
          </Box>
        </StyledDates>
      ))}
      <StyledDates index={12}>
        <Box gap={1} display="flex" sx={{ paddingLeft: "30px" }}>
          <TextField
            variant="outlined"
            fullWidth
            onChange={handleCustomDateChange}
            size="small"
            type="date"
            value={customDates.startDate || ""}
            InputLabelProps={{ shrink: true }}
            label="Start Date"
            name="startDate"
          />
          <TextField
            variant="outlined"
            fullWidth
            onChange={handleCustomDateChange}
            size="small"
            type="date"
            value={customDates.dueDate || ""}
            InputLabelProps={{ shrink: true }}
            label="Due Date"
            name="dueDate"
          />
          <IconButton onClick={addCustomDate}>
            <Add />
          </IconButton>
        </Box>
      </StyledDates>
    </>
  );
};

export default CustomDates;
