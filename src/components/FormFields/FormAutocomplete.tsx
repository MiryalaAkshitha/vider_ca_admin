import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  options: Array<{ label: string; value: any }>;
  multiple?: boolean;
  trigger?: () => void;
  required?: boolean;
}

function FormAutoComplete(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    options,
    multiple = false,
    trigger,
    required = false,
  } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Autocomplete
              id={name}
              size={size}
              multiple={multiple}
              disablePortal
              onChange={(_, value) => {
                field.onChange(value);
                if (trigger) {
                  trigger();
                }
              }}
              value={field.value}
              options={options}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value;
              }}
              getOptionLabel={(option) => option.label}
              fullWidth
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    onBlur={field.onBlur}
                    error={Boolean(error)}
                    label={`${label} ${required ? "*" : ""}`}
                  />
                  {error && (
                    <Typography
                      variant="caption"
                      sx={{ pl: "2px" }}
                      color="rgb(211, 47, 47)"
                    >
                      {error.message || (error as any)?.value?.message}
                    </Typography>
                  )}
                </>
              )}
            />
          </>
        )}
      />
    </>
  );
}

export default FormAutoComplete;
