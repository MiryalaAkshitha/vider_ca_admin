import { Autocomplete, Chip, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  options: Array<string>;
  multiple?: boolean;
  freeSolo?: boolean;
  filteredOptions?: boolean;
  trigger?: () => void;
}

function FormFreeSoloAutoComplete(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    options,
    multiple = false,
    freeSolo = false,
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
              freeSolo={freeSolo}
              onChange={(_, value: any) => {
                field.onChange(value);
                if (trigger) {
                  trigger();
                }
              }}
              renderTags={(value, getTagProps) => {
                return value.map((option, index) => {
                  return (
                    <Chip
                      variant="filled"
                      size="small"
                      label={option}
                      {...getTagProps({ index })}
                    />
                  );
                });
              }}
              value={field.value}
              options={options}
              getOptionLabel={(option) => option}
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

export default FormFreeSoloAutoComplete;
