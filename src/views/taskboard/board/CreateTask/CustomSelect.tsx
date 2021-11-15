import { MenuItem, TextField } from "@mui/material";
import { getTitle } from "utils";

interface IProps {
  label: string;
  name: string;
  required?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  shrink?: boolean;
  options: Array<{ label: string; value: string }>;
  value: any;
}

function CustomSelect(props: IProps) {
  const {
    onChange,
    label,
    name,
    required = true,
    options = [],
    value = "",
  } = props;
  return (
    <TextField
      sx={{ mt: 3 }}
      variant="outlined"
      fullWidth
      size="small"
      value={value}
      required={required}
      onChange={onChange}
      name={name}
      select
      label={label}
    >
      {options.map((item, index) => (
        <MenuItem key={index} value={item.value}>
          {getTitle(item.label)}
        </MenuItem>
      ))}
    </TextField>
  );
}

export default CustomSelect;
