import { Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { currencies } from "utils/currencies";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  code: string;
  currencyDisplay: "SYMBOL" | "CODE";
}

function FormBuilderCurrency(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    placeholder = "",
    required = false,
    code,
    currencyDisplay,
  } = props;

  let currencySymbol = currencies.find(
    (currency) => currency.code === code
  )?.symbol;

  return (
    <>
      <Typography gutterBottom sx={{ display: "block" }} variant="caption">
        {label} {required && <span style={{ color: "red" }}>*</span>}
      </Typography>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {currencyDisplay === "SYMBOL" && (
                <Typography variant="subtitle2" sx={{ pl: "4px" }}>
                  {currencySymbol}
                </Typography>
              )}
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
              {currencyDisplay === "CODE" && (
                <Typography variant="subtitle2" sx={{ pl: "4px" }}>
                  {code}
                </Typography>
              )}
            </Box>
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

export default FormBuilderCurrency;
