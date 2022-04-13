import {
  Autocomplete,
  Avatar,
  Box,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";
import countries from "utils/countries";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  options?: Array<{ label: string; value: string; phone: string }>;
  multiple?: boolean;
  trigger?: () => void;
  renderOption?: any;
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
    renderOption,
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
                field.onChange(value);
                if (trigger) {
                  trigger();
                }
              }}
              value={field.value}
              options={countries.map(({ code, label, phone }) => ({
                label,
                value: code,
                phone,
              }))}
              getOptionLabel={(country) => country.label}
              renderOption={(props, country) => {
                return (
                  <Box
                    component="li"
                    sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                    {...props}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      src={`https://flagcdn.com/w20/${country.value.toLowerCase()}.png`}
                      srcSet={`https://flagcdn.com/w40/${country.value.toLowerCase()}.png 2x`}
                      alt=""
                    />
                    {country.label} ({country.value}) +{country.phone}
                  </Box>
                );
              }}
              renderTags={(tagValue, getTagProps) =>
                tagValue.map((country, index) => (
                  <Chip
                    avatar={
                      <Avatar
                        alt={country.value}
                        src={`https://flagcdn.com/w20/${country.value.toLowerCase()}.png`}
                      />
                    }
                    label={country.label}
                    {...getTagProps({ index })}
                  />
                ))
              }
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

export default FormAutoComplete;
