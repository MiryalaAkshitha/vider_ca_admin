import {
  Box,
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
  required?: boolean;
  displayColumns?: string;
}

function FormBuilderRadio(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    options,
    required = false,
    displayColumns = "1_COLUMN",
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
                <Typography variant="body2" sx={{ color: "black" }}>
                  {label} {required && <span style={{ color: "red" }}>*</span>}
                </Typography>
              }
            />
            <RadioGroup
              row={displayColumns !== "1_COLUMN"}
              sx={{ flexWrap: "wrap" }}
              value={field.value ? field?.value : ""}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            >
              {options.map((item, index) => (
                <>
                  <FormControlLabel
                    key={index}
                    value={item.value}
                    control={<Radio />}
                    label={item.label}
                  />
                  {displayColumns === "2_COLUMNS" && index % 2 !== 0 && (
                    <Box sx={{ flexBasis: "100%", height: 0 }}></Box>
                  )}
                  {displayColumns === "3_COLUMNS" && (index + 1) % 3 === 0 && (
                    <Box sx={{ flexBasis: "100%", height: 0 }}></Box>
                  )}
                </>
              ))}
            </RadioGroup>
          </FormControl>
          {error && (
            <Typography
              variant="caption"
              sx={{ pl: "2px", display: "block" }}
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
