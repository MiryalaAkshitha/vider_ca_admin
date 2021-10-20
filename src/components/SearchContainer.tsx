import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";

interface SearchContainerProps {
  placeHolder: string;
  onChange: (v: string) => void;
  maxWidth?: string;
  debounced?: boolean;
}

function SearchContainer({
  placeHolder,
  onChange,
  maxWidth = "600px",
  debounced,
}: SearchContainerProps) {
  let handleChange = _.debounce(function (e) {
    onChange(e.target.value);
  }, 1000);

  return (
    <Box>
      <TextField
        sx={{ maxWidth, minWidth: 500, width: "100%" }}
        color='primary'
        onChange={(e) => {
          debounced ? handleChange(e) : onChange(e.target.value);
        }}
        size='small'
        placeholder={placeHolder}
        InputProps={{ endAdornment: <Search /> }}
      />
    </Box>
  );
}

export default SearchContainer;
