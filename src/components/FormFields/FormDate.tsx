import { DesktopDatePicker } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  required?: boolean;
}

function FormDate(props: Props) {
  const { name, size = "small", control, label = "", required = false } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <DesktopDatePicker
              label={`${label} ${required ? "*" : ""}`}
              inputFormat="dd-MM-yyyy"
              mask="__-__-____"
              value={field.value}
              onChange={field.onChange}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  size={size}
                  {...params}
                  error={Boolean(error)}
                  onBlur={field.onBlur}
                />
              )}
            />
            {error && (
              <Typography variant="caption" sx={{ pl: "2px" }} color="rgb(211, 47, 47)">
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

export default FormDate;
