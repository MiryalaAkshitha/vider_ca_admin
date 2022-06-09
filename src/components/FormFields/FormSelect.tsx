import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  options: Array<{ label: string; value: string }>;
  style?: any;
  onChange?: (value: any) => void;
  required?: boolean;
}

function FormSelect(props: Props) {
  const {
    name,
    size = "small",
    options,
    control,
    label = "",
    style,
    onChange,
    required = false,
  } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Box>
            <TextField
              error={Boolean(error)}
              variant="outlined"
              label={`${label} ${required ? "*" : ""}`}
              select
              fullWidth
              size={size}
              style={style}
              SelectProps={{
                MenuProps: {
                  PaperProps: {
                    sx: {
                      maxHeight: 300,
                    },
                  },
                },
              }}
              value={field.value}
              onChange={(e) => {
                if (onChange) onChange(e.target.value);
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
                sx={{ pl: "2px", display: "block" }}
                color="rgb(211, 47, 47)"
              >
                {error.message}
              </Typography>
            )}
          </Box>
        )}
      />
    </>
  );
}

export default FormSelect;
