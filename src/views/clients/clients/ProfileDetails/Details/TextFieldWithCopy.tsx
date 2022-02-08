import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton, TextField } from "@mui/material";
import useSnack from "hooks/useSnack";

interface TextFieldWithCopyProps {
  value: string;
  label: string;
  name?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
}

function TextFieldWithCopy({
  label,
  value,
  name,
  onChange,
}: TextFieldWithCopyProps) {
  const snack = useSnack();

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
      value={value}
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
