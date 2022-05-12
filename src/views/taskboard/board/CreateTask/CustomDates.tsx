import { Add, Delete } from "@mui/icons-material";
import { IconButton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { snack } from "components/toast";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { InputChangeType } from "types";
import { StyledDates } from "views/taskboard/styles";

interface IProps {
  control: any;
}

interface IState {
  startDate: string;
  dueDate: string;
}

const CustomDates = ({ control }: IProps) => {
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

  const addCustomDate = (field: any) => {
    const { startDate, dueDate } = customDates;
    if (!startDate || !dueDate) {
      snack.error("Please enter start date and due date");
      return;
    }

    field.onChange([
      ...field?.value,
      {
        startDate,
        dueDate,
      },
    ]);
  };

  const deleteCustomDate = (field: any, index: number) => {
    const newCustomDates = [...field.value];
    newCustomDates.splice(index, 1);
    field.onChange(newCustomDates);
  };

  return (
    <Controller
      name="customDates"
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          {field?.value?.map((item: any, index: number) => (
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
                  <IconButton onClick={() => deleteCustomDate(field, index)}>
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
              <IconButton onClick={() => addCustomDate(field)}>
                <Add />
              </IconButton>
            </Box>
          </StyledDates>
          {error && (
            <Typography
              variant="caption"
              sx={{ pl: "2px", mt: "3px", display: "block" }}
              color="rgb(211, 47, 47)"
            >
              {error.message}
            </Typography>
          )}
        </>
      )}
    />
  );
};

export default CustomDates;
