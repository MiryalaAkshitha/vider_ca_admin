import { DesktopDatePicker } from "@mui/lab";
import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { getFieldSize } from "utils";
interface Props {
  label?: string;
  name: string;
  control: any;
  required?: boolean;
  fieldSize: "SMALL" | "MEDIUM" | "LARGE";
}

function FormBuilderDate(props: Props) {
  const {
    name,
    control,
    label = "",
    required = false,
    fieldSize = "LARGE",
  } = props;

  return (
    <>
      <Typography gutterBottom variant="body2">
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
                  size="small"
                  sx={{
                    width: getFieldSize(fieldSize),
                  }}
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
