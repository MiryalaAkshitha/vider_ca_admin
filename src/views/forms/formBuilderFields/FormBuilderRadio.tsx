import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Controller } from "react-hook-form";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  options: Array<{ label: string; value: string }>;
  row?: boolean;
  required?: boolean;
}

function FormBuilderRadio(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    options,
    row = false,
    required = false,
  } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <>
          <FormControl size={size} fullWidth>
            <FormLabel
              children={
                <Typography
                  sx={{ display: "block", color: "black" }}
                  variant="caption"
                >
                  {label} {required && <span style={{ color: "red" }}>*</span>}
                </Typography>
              }
            />
            <RadioGroup
              row={row}
              aria-labelledby="demo-controlled-radio-buttons-group"
              {...field}
            >
              {options.map((item, index) => (
                <FormControlLabel
                  key={index}
                  value={item.value}
                  control={<Radio />}
                  label={item.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
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
  );
}

export default FormBuilderRadio;
