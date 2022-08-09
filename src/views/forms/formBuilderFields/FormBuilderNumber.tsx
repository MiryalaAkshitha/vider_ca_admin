import { Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { getFieldSize } from "utils/getFieldSize";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  placeholder?: string;
  required?: boolean;
  instructions?: string;
  fieldSize: "SMALL" | "MEDIUM" | "LARGE";
}

function FormBuilderNumber(props: Props) {
  const {
    name,
    fieldSize = "LARGE",
    control,
    label = "",
    placeholder = "",
    required = false,
    instructions,
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
              sx={{ flex: 1, width: getFieldSize(fieldSize) }}
              error={Boolean(error)}
              variant="outlined"
              placeholder={placeholder}
              fullWidth
              size="small"
              type="number"
              value={field.value}
              onChange={(e) => {
                field.onChange(e.target.value);
              }}
            />
            {instructions && (
              <Box>
                <Typography variant="caption" color="rgba(0,0,0,0.7)">
                  <pre style={{ fontFamily: "inherit" }}>{instructions}</pre>
                </Typography>
              </Box>
            )}
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
    </>
  );
}

export default FormBuilderNumber;
