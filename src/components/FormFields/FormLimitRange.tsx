import { Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
}

function FormLimitRange(props: Props) {
  const { name, size = "small", control, label = "" } = props;

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
            <Box display="flex" gap={1}>
              <div>
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
              </div>
              <div>
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
              </div>
            </Box>
          </>
        )}
      />
    </>
  );
}

export default FormLimitRange;
