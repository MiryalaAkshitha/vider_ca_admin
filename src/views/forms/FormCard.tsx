import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { clientFormCard } from "assets";
import React from "react";
import { useNavigate } from "react-router-dom";
import { StyledCard, StyledMoreIcon } from "./styles";

const FormCard = ({ data }: any) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <>
      <StyledCard
        sx={{ minHeight: 130 }}
        onClick={() => navigate(`/forms/${data._id}`)}
      >
        <StyledMoreIcon
          onClick={(e) => {
            e.stopPropagation();
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertIcon />
        </StyledMoreIcon>

        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <div>
              <img src={clientFormCard} alt="Client Form Document" />
            </div>
            <Box>
              <Typography variant="subtitle2">{data?.name}</Typography>
              <Typography variant="body2" color="rgba(0,0,0,0.6)">
                {data?.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </StyledCard>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Preview</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default FormCard;
