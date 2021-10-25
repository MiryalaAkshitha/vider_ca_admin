import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

export default function renderField(field: any, onChange) {
  let type = field?.fieldType;
  if (type === "text" || type === "number" || type === "date") {
    return (
      <FormControl fullWidth component='fieldset'>
        <FormLabel component='legend'>{field?.name}</FormLabel>
        <TextField
          name={field?.name}
          value={field?.value || ""}
          sx={{ mt: 1 }}
          type={type}
          onChange={onChange}
          variant='outlined'
          size='small'
          InputLabelProps={{ shrink: true }}
        />
      </FormControl>
    );
  }
  if (type === "dropdown" || type === "multiselect") {
    return (
      <FormControl fullWidth component='fieldset'>
        <FormLabel component='legend'>{field?.name}</FormLabel>
        <TextField
          name={field?.name}
          value={field?.value || ""}
          type={type}
          sx={{ mt: 1 }}
          onChange={onChange}
          select
          variant='outlined'
          size='small'
          InputLabelProps={{ shrink: true }}>
          {field?.options?.map((item, index) => (
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
      <FormControl fullWidth component='fieldset'>
        <FormLabel component='legend'>{field?.name}</FormLabel>
        <RadioGroup
          row
          aria-label='gender'
          defaultValue='female'
          sx={{ mt: 1 }}
          onChange={onChange}
          name='radio-buttons-group'>
          {field?.options?.map((item, index) => (
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
