import { VisibilityOff, Visibility } from '@mui/icons-material';
import { InputAdornment, TextField } from '@mui/material';
import { SystemStyleObject } from '@mui/system';
import { useState } from 'react';

interface PasswordFieldProps {
  onChange: (e: any) => void;
  label: string;
  sx?: SystemStyleObject
}

function PasswordField({ onChange, label, sx }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }
  return (
    <TextField
      name='password'
      fullWidth
      sx={sx}
      onChange={onChange}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment
            style={{ cursor: 'pointer' }}
            onClick={togglePassword}
            position='start'>
            {showPassword ? <Visibility /> : <VisibilityOff />}
          </InputAdornment>
        ),
      }}
      required
      size="small"
      label={label}
    />
  );
};

export default PasswordField;
