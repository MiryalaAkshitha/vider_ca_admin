import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  multiline?: boolean;
}

function FormInput(props: Props) {
  const { name, size = "small", control, label = "", multiline } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              error={Boolean(error)}
              variant="outlined"
              label={label}
              fullWidth
              multiline={multiline}
              rows={multiline ? 3 : 1}
              size={size}
              {...field}
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
  );
}

export default FormInput;
