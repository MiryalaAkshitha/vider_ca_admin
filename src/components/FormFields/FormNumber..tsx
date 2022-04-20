import { Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
}

function FormNumber(props: Props) {
  const { name, size = "small", control, label = "" } = props;

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
              label={label}
              fullWidth
              type="number"
              size={size}
              {...field}
            />
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

export default FormNumber;
