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

function FormBuilderDate(props: Props) {
  const { name, size = "small", control, label = "", required = false } = props;

  return (
    <>
      <Typography gutterBottom sx={{ display: "block" }} variant="caption">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <DesktopDatePicker
              mask="____/__/__"
              inputFormat="yyyy/MM/dd"
              value={field.value || null}
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
              <Typography
                variant="caption"
                sx={{ pl: "2px" }}
                color="rgb(211, 47, 47)"
              >
                {error.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

export default FormBuilderDate;
