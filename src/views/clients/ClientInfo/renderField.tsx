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
import FileDrop from "components/FileDrop";
import { useState } from "react";

export function renderField(field: any, onChange?: (v: any) => void) {
  const handleChange = (v: any) => {
    onChange && onChange(v);
  };

  let type = field?.fieldType;
  if (type === "text" || type === "number" || type === "date") {
    return (
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">
          {field?.name}
          <span style={{ color: "red" }}>{field.required && " *"}</span>
        </FormLabel>
        <TextField
          name={field?.name}
          value={field?.value || ""}
          sx={{ mt: 1 }}
          type={type}
          onChange={(e) => handleChange(e.target.value)}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
    );
  }
  if (type === "multiline") {
    return (
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">
          {field?.name}
          <span style={{ color: "red" }}>{field.required && " *"}</span>
        </FormLabel>
        <TextField
          rows={4}
          multiline
          name={field?.name}
          value={field?.value || ""}
          sx={{ mt: 1 }}
          type={type}
          onChange={(e) => handleChange(e.target.value)}
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
        onChange={(e: any) => handleChange(e.target.value)}
        value={field?.value}
        name={field?.name}
      />
    );
  }

  if (type === "file") {
    return (
      <>
        <FormLabel sx={{ mb: 1 }} component="legend">
          {field?.name}
          <span style={{ color: "red" }}>{field.required && " *"}</span>
        </FormLabel>
        <FileDrop name={field?.name} onChange={(v: any) => handleChange(v)} />
      </>
    );
  }
  if (type === "url") {
    return (
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">
          {field?.name}
          <span style={{ color: "red" }}>{field.required && " *"}</span>
        </FormLabel>
        <TextField
          name={field?.name}
          value={field?.value || ""}
          sx={{ mt: 1 }}
          type={type}
          placeholder="https://example.com"
          onChange={(e: any) => handleChange(e.target.value)}
          variant="outlined"
          size="small"
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
    );
  }
  if (type === "dropdown") {
    return (
      <FormControl fullWidth component="fieldset">
        <FormLabel component="legend">
          {field?.name}
          <span style={{ color: "red" }}>{field.required && " *"}</span>
        </FormLabel>
        <TextField
          name={field?.name}
          value={field?.value || ""}
          type={type}
          sx={{ mt: 1 }}
          onChange={(e: any) => handleChange(e.target.value)}
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
        <FormLabel component="legend">
          {field?.name}
          <span style={{ color: "red" }}>{field.required && " *"}</span>
        </FormLabel>
        <RadioGroup
          row
          aria-label="gender"
          value={field?.value}
          sx={{ mt: 1 }}
          onChange={(e: any) => handleChange(e.target.value)}
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
        onChange={(e: any) => handleChange(e.target.checked?.toString())}
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
