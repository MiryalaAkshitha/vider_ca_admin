import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  IconButton,
} from "@mui/material";
import { useState } from "react";

export function renderField(field: any, onChange: (v: any) => void) {
  let type = field?.fieldType;
  if (type === "text" || type === "number" || type === "date") {
    return (
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">{field?.name}</FormLabel>
        <TextField
          name={field?.name}
          value={field?.value || ""}
          sx={{ mt: 1 }}
          type={type}
          onChange={onChange}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
    );
  }
  if (type === "password") {
    return (
      <PasswordField
        label={field?.name}
        onChange={onChange}
        value={field?.value}
        name={field?.name}
      />
    );
  }
  if (type === "url") {
    return (
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">{field?.name}</FormLabel>
        <TextField
          name={field?.name}
          value={field?.value || ""}
          sx={{ mt: 1 }}
          type={type}
          placeholder="https://example.com"
          onChange={onChange}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
    );
  }
  if (type === "dropdown" || type === "multiselect") {
    return (
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">{field?.name}</FormLabel>
        <TextField
          name={field?.name}
          value={field?.value || ""}
          type={type}
          sx={{ mt: 1 }}
          onChange={onChange}
          select
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        >
          {field?.options?.map((item: any, index: number) => (
            <MenuItem value={item} key={index}>
              {item}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    );
  }
  if (type === "radio") {
    return (
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">{field?.name}</FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          defaultValue="female"
          sx={{ mt: 1 }}
          onChange={onChange}
          name="radio-buttons-group"
        >
          {field?.options?.map((item: any, index: number) => (
            <FormControlLabel
              key={index}
              value={item}
              control={<Radio checked={item === field?.value} />}
              label={item}
            />
          ))}
        </RadioGroup>
      </FormControl>
    );
  }
  if (type === "checkbox") {
    return (
      <FormControlLabel
        onChange={onChange}
        checked={field?.value === "true" ? true : false}
        control={<Checkbox />}
        label={field?.name}
      />
    );
  }
}

const PasswordField = ({ label, value, onChange }: any) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordInputType = () => {
    setShowPassword(!showPassword);
  };

  return (
    <FormControl fullWidth component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <TextField
        variant="outlined"
        size="small"
        value={value || ""}
        sx={{ mt: 1 }}
        onChange={onChange}
        required
        InputProps={{
          endAdornment: !showPassword ? (
            <IconButton size="small" onClick={togglePasswordInputType}>
              <VisibilityOff />
            </IconButton>
          ) : (
            <IconButton size="small" onClick={togglePasswordInputType}>
              <Visibility />
            </IconButton>
          ),
        }}
        fullWidth
        type={showPassword ? "text" : "password"}
      />
    </FormControl>
  );
};
