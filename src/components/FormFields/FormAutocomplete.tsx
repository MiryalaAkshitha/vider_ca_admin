import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
}

function CustomAutoComplete(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    options,
    multiple = false,
  } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Autocomplete
              size={size}
              multiple={multiple}
              disablePortal
              id={name}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              value={field.value}
              options={options}
              getOptionLabel={(option) => option.label}
              fullWidth
              renderInput={(params) => (
                <TextField
                  onBlur={field.onBlur}
                  error={Boolean(error)}
                  {...params}
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
                {label} is required.
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

export default CustomAutoComplete;
