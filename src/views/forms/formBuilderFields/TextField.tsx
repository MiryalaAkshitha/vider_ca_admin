import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  multiline?: boolean;
  placeholder?: string;
}

function FormbuilderTextField(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    multiline,
    placeholder = "",
  } = props;

  return (
    <>
      <Typography gutterBottom sx={{ display: "block" }} variant="caption">
        {label}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <TextField
              error={Boolean(error)}
              variant="outlined"
              placeholder={placeholder}
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

export default FormbuilderTextField;
