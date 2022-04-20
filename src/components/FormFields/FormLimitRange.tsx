import { Box, MenuItem, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  includeFormat?: boolean;
  formats?: "multiline" | "fileSize";
}

function FormLimitRange(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    includeFormat,
    formats = "",
  } = props;

  let formatOptions = () => {
    if (formats === "multiline") {
      return [
        { label: "Characters", value: "CHARACTERS" },
        { label: "Words", value: "WORDS" },
      ];
    } else if (formats === "fileSize") {
      return [
        { label: "kb", value: "KB" },
        { label: "Mb", value: "MB" },
      ];
    } else {
      return [
        { label: "Values", value: "VALUES" },
        { label: "Digits", value: "DIGITS" },
      ];
    }
  };

  return (
    <>
      <Typography mb="10px" variant="body2" color="rgba(0,0,0,0.6)">
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Box display="flex" gap={1} width="100%">
              <Box flex={1}>
                <TextField
                  error={Boolean((error as any)?.min?.message)}
                  variant="outlined"
                  fullWidth
                  size={size}
                  label="Min"
                  type="number"
                  value={field?.value?.min || 0}
                  onChange={(e) => {
                    field.onChange({
                      ...field.value,
                      min: +e.target.value,
                    });
                  }}
                />
                {(error as any)?.min?.message && (
                  <Typography
                    variant="caption"
                    sx={{ pl: "2px", mt: "4px", display: "block" }}
                    color="rgb(211, 47, 47)"
                  >
                    {(error as any)?.min?.message}
                  </Typography>
                )}
              </Box>
              <Box flex={1}>
                <TextField
                  error={Boolean((error as any)?.max?.message)}
                  variant="outlined"
                  fullWidth
                  label="Max"
                  type="number"
                  size={size}
                  value={field?.value?.max || 0}
                  onChange={(e) => {
                    field.onChange({
                      ...field.value,
                      max: +e.target.value,
                    });
                  }}
                />
                {(error as any)?.max?.message && (
                  <Typography
                    variant="caption"
                    sx={{ pl: "2px", mt: "4px", display: "block" }}
                    color="rgb(211, 47, 47)"
                  >
                    {(error as any)?.max?.message}
                  </Typography>
                )}
              </Box>
              {includeFormat && (
                <Box flex={1}>
                  <TextField
                    size="small"
                    fullWidth
                    label="Format"
                    onChange={(e) => {
                      field.onChange({
                        ...field.value,
                        type: e.target.value,
                      });
                    }}
                    select
                    value={field?.value?.type || ""}
                  >
                    {formatOptions().map((item, index) => (
                      <MenuItem value={item.value} key={index}>
                        {item.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              )}
            </Box>
          </>
        )}
      />
    </>
  );
}

export default FormLimitRange;
