import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import countries from "utils/countries";
import { FormBuilderInputTypes } from "../utils/renderFieldsComponent";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  required?: boolean;
  inputs: any[];
}

function FormBuilderFieldWithInputs(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    required = false,
    inputs,
  } = props;

  const getOptions = (input: any) => {
    if (input.inputType === FormBuilderInputTypes.TITLE) {
      return input.options;
    }

    if (input.inputType === FormBuilderInputTypes.COUNTRY) {
      if (input.allowedCountries.length) {
        return countries
          .filter((item: any) => {
            return input.allowedCountries.includes(item.code);
          })
          .map((item: any) => {
            return {
              label: item.label,
              value: item.code,
            };
          });
      }
      return countries.map((item: any) => {
        return {
          label: item.label,
          value: item.code,
        };
      });
    }

    return input.options;
  };

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
            <Grid container spacing={2}>
              {inputs.map((input, index) => (
                <Grid item xs={6}>
                  {input.inputType === FormBuilderInputTypes.TITLE ||
                  input.inputType === FormBuilderInputTypes.COUNTRY ? (
                    <TextField
                      key={index}
                      variant="outlined"
                      fullWidth
                      size={size}
                      select
                      value={field.value ? field.value[input?._id] : ""}
                      onChange={(e) => {
                        let value = field.value || {};
                        field.onChange({
                          ...value,
                          [input._id]: e.target.value,
                        });
                      }}
                      placeholder={input.placeholder || ""}
                    >
                      {getOptions(input)?.map((option: any, index: number) => (
                        <MenuItem key={index} value={option?.value}>
                          {option?.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  ) : (
                    <TextField
                      key={index}
                      variant="outlined"
                      fullWidth
                      size={size}
                      onChange={(e) => {
                        let value = field.value || {};
                        field.onChange({
                          ...value,
                          [input._id]: e.target.value,
                        });
                      }}
                      placeholder={input.placeholder || ""}
                    />
                  )}
                  <Typography
                    sx={{ display: "block", mt: "3px" }}
                    variant="caption"
                    color="rgba(0,0,0,0.6)"
                  >
                    {input.label}
                  </Typography>
                </Grid>
              ))}
            </Grid>
            {error && (
              <Typography
                variant="caption"
                sx={{ pl: "2px", display: "block", pt: "4px" }}
                color="rgb(211, 47, 47)"
              >
                {(error as any)[Object.keys(error)[0]]?.message}
              </Typography>
            )}
          </>
        )}
      />
    </>
  );
}

export default FormBuilderFieldWithInputs;
