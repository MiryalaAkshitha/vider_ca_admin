import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Control, Controller, FieldError } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  error?: FieldError;
}

function CustomCheckboxField(props: Props) {
  const { name, size = "small", control, label = "", error } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControlLabel
            sx={{ width: "100%" }}
            control={
              <Checkbox
                size={size}
                checked={field.value}
                onChange={field.onChange}
              />
            }
            label={label}
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

export default CustomCheckboxField;
