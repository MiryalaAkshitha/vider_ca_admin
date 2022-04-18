import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
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

function FormBuilderCheckbox(props: Props) {
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
    <>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <FormControl size={size} fullWidth>
              <FormLabel
                children={
                  <Typography sx={{ color: "black" }} variant="body2">
                    {label}{" "}
                    {required && <span style={{ color: "red" }}>*</span>}
                  </Typography>
                }
              />
              <FormGroup row={row}>
                {options?.map((item, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        onChange={(e) => {
                          let value = field.value || [];
                          if (e.target.checked) {
                            let newValue = [...value, item];
                            field.onChange(newValue);
                          } else {
                            let filteredValue = value.filter(
                              (opt: any) => opt?.value !== item.value
                            );
                            field.onChange(filteredValue);
                          }
                        }}
                      />
                    }
                    label={item.label}
                  />
                ))}
              </FormGroup>
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

export default FormBuilderCheckbox;
