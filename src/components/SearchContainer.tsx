import { Search } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";

interface SearchContainerProps {
  placeHolder: string;
  onChange: (v: string) => void;
}

function SearchContainer({ placeHolder, onChange }: SearchContainerProps) {
  const handleChange = (e: any) => {
    let debounceFunc = _.debounce(() => onChange(e.target.value), 1500);
    debounceFunc();
  };

  return (
    <Box>
      <TextField
        sx={{ maxWidth: 600, minWidth: 500, width: "100%" }}
        color='primary'
        onChange={handleChange}
        size='small'
        placeholder={placeHolder}
        InputProps={{ endAdornment: <Search /> }}
      />
    </Box>
  );
}

export default SearchContainer;
