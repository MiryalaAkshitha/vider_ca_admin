import { Checkbox, FormControlLabel, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  sx?: any;
}

function FormCheckbox(props: Props) {
  const { name, size = "medium", control, label = "", sx } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControlLabel
              sx={{ width: "100%", ...sx }}
              control={
                <Checkbox
                  size={size}
                  checked={field.value}
                  onChange={field.onChange}
                />
              }
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
  );
}

export default FormCheckbox;
