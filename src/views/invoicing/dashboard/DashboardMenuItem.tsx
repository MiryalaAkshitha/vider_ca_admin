import React, { useState } from "react";
import { Box, Collapse, Divider, ListItemIcon, ListItemText, Typography } from "@mui/material";
import { StyledListItem, StyledListItemButton } from "../styles";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const DashboardMenuItem = ({ setValue, dropDownOption, dropDown, title, icon }) => {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <StyledListItem onClick={() => (dropDownOption ? handleClick() : setValue(title))}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <ListItemIcon sx={{ minWidth: "auto", mr: 2 }}>{icon}</ListItemIcon>
          <ListItemText primary={title} />
          {dropDownOption ? (
            open ? (
              <ArrowDropDownIcon sx={{ marginLeft: "auto" }} />
            ) : (
              <ArrowRightIcon sx={{ marginLeft: "auto" }} />
            )
          ) : null}
        </Box>
        <Divider />
      </StyledListItem>
      {dropDown && dropDownOption ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {dropDown.map((data, index) => {
            return (
              <React.Fragment key={index}>
                <StyledListItemButton onClick={() => setValue(data)} sx={{ pl: 7 }}>
                  <Typography>{data}</Typography>
                </StyledListItemButton>
              </React.Fragment>
            );
          })}
        </Collapse>
      ) : null}
    </React.Fragment>
  );
};

export default DashboardMenuItem;
