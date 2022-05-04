import { MenuItem, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { getFieldSize } from "utils";

interface Props {
  label?: string;
  name: string;
  control: any;
  options: Array<{ label: string; value: string }>;
  required?: boolean;
  fieldSize: "SMALL" | "MEDIUM" | "LARGE";
}

function FormBuilderSelect(props: Props) {
  const {
    name,
    options,
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
            <TextField
              error={Boolean(error)}
              variant="outlined"
              select
              fullWidth
              size="small"
              sx={{
                width: getFieldSize(fieldSize),
              }}
              value={field.value || ""}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            >
              {options.map((item, index) => (
                <MenuItem key={index} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>
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

export default FormBuilderSelect;
