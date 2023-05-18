import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, TextField } from "@mui/material";
import { snack } from "components/toast";

interface TextFieldWithCopyProps {
  value: string;
  label: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}

function TextFieldWithCopy(props: TextFieldWithCopyProps) {
  const { label, value, name, onChange, onBlur, disabled = false, required } = props;

  const onCopy = () => {
    window.navigator.clipboard.writeText(value).then(
      function () {
        navigator.clipboard.readText().then(() => {
          snack.success("Copied");
        });
      },
      function (err) {
        snack.error("something went wrong");
      }
    );
  };

  return (
    <TextField
      label={label}
      fullWidth
      variant="outlined"
      size="small"
      onBlur={onBlur}
      value={value}
      disabled={disabled}
      required={required}
      name={name}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <IconButton onClick={onCopy}>
            <ContentCopyIcon fontSize="small" />
          </IconButton>
        ),
      }}
      InputLabelProps={{ shrink: true }}
    />
  );
}

export default TextFieldWithCopy;
