import { Autocomplete, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  options: Array<{ label: string; value: string }>;
  multiple?: boolean;
  trigger?: () => void;
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
              onChange={(_, value) => {
                field.onChange(
                  typeof field.value === "object" ? value : value?.value
                );
                if (trigger) {
                  trigger();
                }
              }}
              value={field.value}
              options={options}
              isOptionEqualToValue={(option, value) => {
                return option.value === value.value || option.value === value;
              }}
              getOptionLabel={(option) => option.label || option}
              fullWidth
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    onBlur={field.onBlur}
                    error={Boolean(error)}
                    label={label}
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
        )}
      />
    </>
  );
}

export default FormAutoComplete;
