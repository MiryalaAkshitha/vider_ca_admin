import { Add, Delete } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import useSnack from "hooks/useSnack";
import { Dispatch, SetStateAction, useState } from "react";
import { RecurringStateProps } from "types/createTask.types";
import { StyledDates } from "views/taskboard/styles";

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

  const handleCustomDateChange = (e: any) => {
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
    let filtered = state.customDates.filter((_, i) => i !== index);
    setState({ ...state, customDates: filtered });
  };

  return (
    <>
      {state.customDates.map((item, index) => (
        <StyledDates index={index}>
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
