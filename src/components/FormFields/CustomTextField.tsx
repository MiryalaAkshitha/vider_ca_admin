import { TextField, Typography } from "@mui/material";
import { Controller, FieldError } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  error?: FieldError;
}

function CustomTextField(props: Props) {
  const { name, size = "small", control, label = "", error } = props;

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
            fullWidth
            size={size}
            {...field}
          />
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

export default CustomTextField;
