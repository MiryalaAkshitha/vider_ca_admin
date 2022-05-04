import {
  Box,
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
  required?: boolean;
  displayColumns?: string;
}

function FormBuilderCheckbox(props: Props) {
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
              <FormGroup
                row={displayColumns !== "1_COLUMN"}
                sx={{ flexWrap: "wrap" }}
              >
                {options?.map((item, index) => (
                  <>
                    <FormControlLabel
                      name={name}
                      key={index}
                      control={
                        <Checkbox
                          checked={
                            field?.value?.length &&
                            field?.value
                              ?.map((item: any) => item?.value)
                              .includes(item.value)
                          }
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
                    {displayColumns === "2_COLUMNS" && index % 2 !== 0 && (
                      <Box sx={{ flexBasis: "100%", height: 0 }}></Box>
                    )}
                    {displayColumns === "3_COLUMNS" &&
                      (index + 1) % 3 === 0 && (
                        <Box sx={{ flexBasis: "100%", height: 0 }}></Box>
                      )}
                  </>
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
