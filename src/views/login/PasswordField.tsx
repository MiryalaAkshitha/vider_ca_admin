import { VisibilityOff, Visibility } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import { useState } from "react";

interface PasswordFieldProps {
  onChange: (e: any) => void;
  label: string;
  sx?: SystemStyleObject;
  value: string;
  required?: boolean;
  name?: string;
}

function PasswordField({
  onChange,
  required = true,
  label,
  sx,
  value,
  name = "password",
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <TextField
      name={name}
      fullWidth
      sx={sx}
      value={value}
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment
            style={{ cursor: "pointer" }}
            onClick={togglePassword}
            position="start"
          >
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </InputAdornment>
        ),
      }}
      required={required}
      size="small"
      label={label}
    />
  );
}

export default PasswordField;
