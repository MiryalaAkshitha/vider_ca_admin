import { TextField, Typography } from "@mui/material";
import { Controller } from "react-hook-form";

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
              multiline={multiline}
              rows={multiline ? 3 : 1}
              size={size}
              {...field}
            />
            {showCharacterCount && (
              <Typography mt={1} variant="body2">
                Character count: {getCount(field.value) || 0}
              </Typography>
            )}
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

export default FormbuilderTextField;
