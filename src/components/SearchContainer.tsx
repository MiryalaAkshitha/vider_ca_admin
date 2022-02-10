import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";

interface SearchContainerProps {
  placeHolder?: string;
  onChange: (v: string) => void;
  onFocus?: (e: any) => void;
  maxWidth?: string;
  debounced?: boolean;
  minWidth?: string;
  value?: string;
  defaultValue?: string;
  autoFocus?: boolean;
}

function SearchContainer(props: SearchContainerProps) {
  const {
    placeHolder,
    onChange,
    maxWidth = "600px",
    debounced,
    minWidth = "600px",
    onFocus,
    value,
    defaultValue = "",
    autoFocus = false,
  } = props;

  const handleChange = _.debounce(function (e) {
    onChange(e.target.value);
  }, 1000);

  return (
    <Box>
      <TextField
        sx={{ maxWidth, minWidth }}
        color="primary"
        defaultValue={defaultValue}
        autoFocus={autoFocus}
        onChange={(e) => {
          debounced ? handleChange(e) : onChange(e.target.value);
        }}
        {...(value !== undefined && { value: value })}
        size="small"
        placeholder={placeHolder}
        InputProps={{ endAdornment: <Search /> }}
        onFocus={onFocus}
      />
    </Box>
  );
}

export default SearchContainer;
