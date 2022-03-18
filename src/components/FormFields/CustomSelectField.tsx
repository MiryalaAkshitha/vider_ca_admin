import { MenuItem, TextField, Typography } from "@mui/material";
import { Controller, FieldError } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  error?: FieldError;
  options: Array<{ label: string; value: string }>;
}

function CustomSelectField(props: Props) {
  const { name, size = "small", options, control, label = "", error } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <TextField
            error={Boolean(error)}
            variant="outlined"
            label={label}
            select
            fullWidth
            size={size}
            {...field}
          >
            {options.map((item, index) => (
              <MenuItem key={index} value={item.value}>
                {item.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />
      {error && (
        <Typography
          variant="caption"
          sx={{ pl: "2px" }}
          color="rgb(211, 47, 47)"
        >
          {error.message}
        </Typography>
      )}
    </>
  );
}

export default CustomSelectField;
