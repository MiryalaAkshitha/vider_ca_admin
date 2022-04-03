import SearchContainer from "components/SearchContainer";
import { Grid, Menu, MenuItem, IconButton, Box } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  StyledCard,
  ClientFormBoldText,
  ClientFormNormalText,
  StyledMoreIcon,
} from "./formStyles";
import { clientFormCard } from "assets";

const CardView = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledCard>
      <CardContent>
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
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div>
              <img src={clientFormCard} alt="Client Form Document" />
            </div>
            <div style={{ paddingLeft: "8px" }}>
              <ClientFormBoldText p={0}>KYB form</ClientFormBoldText>
              <ClientFormNormalText p={0}>
                Etiam convallis elementum sapien, a aliquam turpis aliquam vitae
                praesent sollicitudin felis vel mi facilisis posuere.
              </ClientFormNormalText>
            </div>
          </div>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

const ClientForms = () => {
  return (
    <Grid container p={2} direction={"column"}>
      <Grid item>
        <SearchContainer
          value={""}
          placeHolder="Search by Name / Client Type"
          width={"350px"}
          minWidth={"100px"}
          onChange={(v) => {}}
        />
      </Grid>
      <Grid item container>
        <Grid item xs={3} sm={6}>
          <CardView />
        </Grid>
        <Grid item xs={3} sm={6}>
          <CardView />
        </Grid>
        <Grid item xs={3} sm={6}>
          <CardView />
        </Grid>
        <Grid item xs={3} sm={6}>
          <CardView />
        </Grid>
        <Grid item xs={3} sm={6}>
          <CardView />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ClientForms;
