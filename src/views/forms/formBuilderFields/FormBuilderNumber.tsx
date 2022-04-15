import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  placeholder?: string;
  required?: boolean;
}

function FormBuilderNumber(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    placeholder = "",
    required = false,
  } = props;

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
            <TextField
              sx={{ flex: 1 }}
              error={Boolean(error)}
              variant="outlined"
              placeholder={placeholder}
              fullWidth
              size={size}
              type="number"
              value={field.value}
              onChange={(e) => {
                field.onChange(+e.target.value);
              }}
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

export default FormBuilderNumber;
