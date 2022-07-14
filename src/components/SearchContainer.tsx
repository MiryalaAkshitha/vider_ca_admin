import { Close, Search } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import _ from "lodash";
import { useCallback, useEffect, useState } from "react";

interface SearchContainerProps {
  placeHolder?: string;
  onChange: (v: string) => void;
  onFocus?: (e: any) => void;
  maxWidth?: string;
  debounced?: boolean;
  minWidth?: string;
  value?: string;
  autoFocus?: boolean;
}

function SearchContainer(props: SearchContainerProps) {
  const {
    placeHolder = "Search",
    onChange,
    maxWidth = "600px",
    debounced,
    minWidth = "400px",
    onFocus,
    value,
    autoFocus = false,
  } = props;
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    setInputValue(value || "");
  }, [value]);

  const handleChange = useCallback(
    _.debounce(function (e) {
      onChange(e.target.value);
    }, 1000),
    []
  );

  return (
    <Box>
      <TextField
        sx={{ maxWidth, minWidth }}
        color="primary"
        value={inputValue}
        autoFocus={autoFocus}
        onChange={(e) => {
          if (debounced) {
            handleChange(e);
          } else {
            onChange(e.target.value);
          }
          setInputValue(e.target.value);
        }}
        size="small"
        placeholder={placeHolder}
        InputProps={{
          endAdornment: inputValue ? (
            <IconButton
              sx={{ mr: -1 }}
              onClick={() => {
                setInputValue("");
                onChange("");
              }}
            >
              <Close fontSize="small" />
            </IconButton>
          ) : (
            <Search fontSize="small" />
          ),
        }}
        onFocus={onFocus}
      />
    </Box>
  );
}

export default SearchContainer;
