import { Box, TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";
import { getFieldSize } from "utils";

interface Props {
  label?: string;
  name: string;
  size?: "small" | "medium";
  control: any;
  multiline?: boolean;
  placeholder?: string;
  required?: boolean;
  showCharacterCount?: boolean;
  countType?: "WORDS" | "CHARACTERS";
  instructions?: string;
  fieldSize: "SMALL" | "MEDIUM" | "LARGE";
}

function FormbuilderTextField(props: Props) {
  const {
    name,
    size = "small",
    control,
    label = "",
    multiline,
    placeholder = "",
    required = false,
    showCharacterCount = false,
    countType = "WORDS",
    instructions,
    fieldSize = "LARGE",
  } = props;

  const getCount = (value: string) => {
    if (countType === "WORDS") {
      return value?.split(" ").length;
    } else {
      return value?.length;
    }
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
            <TextField
              error={Boolean(error)}
              variant="outlined"
              placeholder={placeholder}
              fullWidth
              sx={{
                width: getFieldSize(fieldSize),
              }}
              multiline={multiline}
              minRows={multiline ? 3 : 1}
              size={size}
              onChange={field.onChange}
              value={field.value ? field?.value : ""}
            />
            {instructions && (
              <Box>
                <Typography variant="caption" color="rgba(0,0,0,0.7)">
                  <pre style={{ fontFamily: "inherit" }}>{instructions}</pre>
                </Typography>
              </Box>
            )}
            {showCharacterCount && (
              <Typography mt={1} variant="body2">
                {countType === "WORDS" ? "Words" : "Characters"} count:{" "}
                {getCount(field.value) || 0}
              </Typography>
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

export default FormbuilderTextField;
