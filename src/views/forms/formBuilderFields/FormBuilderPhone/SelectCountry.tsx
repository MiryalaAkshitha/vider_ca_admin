import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import countries from "utils/countries";

const SelectCountryCode = ({ value, onChange, setWidth, allowedCountries }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const codeRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setWidth(codeRef.current?.offsetWidth || 0);
  }, [value, codeRef, setWidth]);

  let countryCode = countries.find((country) => country.phone === value);

  return (
    <>
      <Box
        ref={codeRef}
        sx={{
          background: "rgba(0, 0, 0, 0.05)",
          position: "absolute",
          left: 0,
          top: 0,
          height: "100%",
          minWidth: 93,
          display: "flex",
          gap: 1,
          alignItems: "center",
          justifyContent: "space-between",
          px: 1,
          zIndex: 2,
          cursor: "pointer",
        }}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <Box display="flex" gap="6px">
          <Box>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${countryCode?.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${countryCode?.code.toLowerCase()}.png 2x`}
              alt=""
            />
          </Box>
          <Typography variant="body2">+{countryCode?.phone}</Typography>
        </Box>
        <ArrowDropDownIcon sx={{ fontSize: 18 }} />
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        PaperProps={{
          sx: {
            maxHeight: "200px",
          },
        }}
      >
        {allowedCountries?.map((country: any, index: number) => (
          <MenuItem
            key={index}
            onClick={() => {
              setAnchorEl(null);
              onChange(country.phone);
            }}
          >
            <Box display="flex" gap={1}>
              <div>
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
                  alt=""
                />
              </div>
              {country.label}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default SelectCountryCode;
