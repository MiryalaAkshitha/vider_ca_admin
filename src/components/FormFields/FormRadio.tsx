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
  onChange?: (value: any) => void;
  required?: boolean;
}

function FormRadio(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    options,
    row = false,
    onChange,
    required = false,
  } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControl size={size} fullWidth>
              <FormLabel id={name}>
                {label} {required ? "*" : ""}
              </FormLabel>
              <RadioGroup
                row={row}
                aria-labelledby="demo-controlled-radio-buttons-group"
                onChange={(e) => {
                  field.onChange(e.target.value);
                  onChange && onChange(e.target.value);
                }}
                value={field.value}
              >
                {options.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Radio
                        color="secondary"
                        size="small"
                        value={item.value}
                      />
                    }
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
    </>
  );
}

export default FormRadio;
