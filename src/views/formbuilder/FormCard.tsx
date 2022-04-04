import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Card, Menu, MenuItem, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { clientFormCard } from "assets";
import React from "react";
import { StyledMoreIcon } from "./styles";

const FormCard = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ position: "relative" }}>
      <CardContent sx={{ py: 4, px: 3 }}>
        <StyledMoreIcon onClick={handleClick}>
          <MoreVertIcon />
        </StyledMoreIcon>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>Edit</MenuItem>
          <MenuItem onClick={handleClose}>Preview</MenuItem>
          <MenuItem onClick={handleClose}>Duplicate</MenuItem>
          <MenuItem onClick={handleClose}>Delete</MenuItem>
        </Menu>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <div>
              <img src={clientFormCard} alt="Client Form Document" />
            </div>
            <Box>
              <Typography variant="subtitle2">KYB form</Typography>
              <Typography variant="body2" color="rgba(0,0,0,0.6)">
                Etiam convallis elementum sapien, a aliquam turpis aliquam vitae
                praesent sollicitudin felis vel mi facilisis posuere.
              </Typography>
            </Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FormCard;
