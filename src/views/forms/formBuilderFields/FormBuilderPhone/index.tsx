import { Box, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Controller } from "react-hook-form";
import SelectCountryCode from "./SelectCountry";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  includeCountryCode?: boolean;
  allowedCountries?: Array<string>;
  defaultCountryCode?: string;
}

function FormBuilderPhone(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    multiline,
    placeholder = "",
    required = false,
    includeCountryCode = false,
    allowedCountries = [],
    defaultCountryCode = "91",
  } = props;
  const [width, setWidth] = useState(0);

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
            <Box sx={{ position: "relative" }}>
              {includeCountryCode && (
                <SelectCountryCode
                  value={field.value?.code || defaultCountryCode}
                  allowedCountries={allowedCountries}
                  setWidth={setWidth}
                  onChange={(v: any) => {
                    let value = field.value || {};
                    field.onChange({
                      ...value,
                      code: v,
                    });
                  }}
                />
              )}
              <TextField
                error={Boolean(error)}
                variant="outlined"
                placeholder={placeholder}
                fullWidth
                rows={multiline ? 3 : 1}
                size={size}
                InputProps={{
                  sx: {
                    pl: `${width}px`,
                  },
                }}
                onChange={(e) => {
                  let value = field.value || {};
                  field.onChange({
                    ...value,
                    number: e.target.value,
                  });
                }}
                value={field.value?.number}
              />
            </Box>
            {error && (
              <Typography
                variant="caption"
                sx={{ pl: "2px" }}
                color="rgb(211, 47, 47)"
              >
                {error.message || (error as any)?.number?.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

export default FormBuilderPhone;
