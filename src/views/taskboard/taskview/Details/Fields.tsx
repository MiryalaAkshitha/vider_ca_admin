import { MenuItem, styled, TextField } from "@mui/material";
import { getTitle } from "utils";

interface TextFieldProps {
  value: string;
  name?: string;
  onChange?: (event: React.ChangeEvent<{ value: unknown }>) => void;
  disabled?: boolean;
  type?: string;
}

export function CustomTextField(props: TextFieldProps) {
  const { value, onChange, name, disabled = false, type = "text" } = props;
  return (
    <TextField
      sx={{
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
          {
            borderWidth: 1,
          },
        "& .MuiOutlinedInput-input.Mui-disabled": {
          WebkitTextFillColor: "black",
        },
        "& .MuiOutlinedInput-root fieldset": {
          border: 0,
        },
      }}
      name={name}
      type={type}
      fullWidth
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

interface SelectProps {
  value: string;
  name?: string;
  onChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
  options: { label: string; value: any }[];
}

export function CustomSelect({ value, options, onChange, name }: SelectProps) {
  return (
    <StyledTextField
      select
      name={name}
      fullWidth
      value={value}
      onChange={onChange}
    >
      {options.map((option, index) => (
        <MenuItem value={option.value} key={index}>
          {getTitle(option.label)}
        </MenuItem>
      ))}
    </StyledTextField>
  );
}

export const StyledTextField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderWidth: 0,
    },
    "&.Mui-focused fieldset": {
      borderWidth: 1,
    },
    "&.Mui-disabled": {
      WebkitTextFillColor: "black",
    },
  },
}));
