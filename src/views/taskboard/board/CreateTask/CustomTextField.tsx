import { TextField } from "@mui/material";

interface IProps {
  label: string;
  name: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  multiline?: boolean;
  rows?: number;
  shrink?: boolean;
}

function CustomTextField(props: IProps) {
  const {
    onChange,
    label,
    multiline = false,
    rows,
    name,
    required = true,
    shrink = false,
  } = props;
  return (
    <TextField
      sx={{ mt: 3 }}
      variant="outlined"
      fullWidth
      size="small"
      required={required}
      {...(shrink && { shrink: true })}
      multiline={multiline}
      rows={rows}
      onChange={onChange}
      name={name}
      label={label}
    />
  );
}

export default CustomTextField;
