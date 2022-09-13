import React from "react";
import { Box, Paper, Typography, IconButton, Grid, Checkbox, Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useMenu } from "context/MenuPopover";

const ClientGroupTeamView = () => {
  const navigate = useNavigate();
  const menu = useMenu();

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Remove client",
          action: () => alert("need to remove client"),
        },
      ],
    });
  };

  return (
    <Box p={2}>
      <Box
        mb={2}
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <ArrowBackIcon onClick={() => navigate(-1)} />
        <Typography variant="subtitle2" ml={1}>
          Client Groups/Group1/Client User Details
        </Typography>
      </Box>
      <Paper
        sx={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: 2 }}
      >
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.4 }}>
            Client name
          </Typography>
          <Typography variant="subtitle2">Vider</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.4 }}>
            Client Category
          </Typography>
          <Typography variant="subtitle2">company</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.4 }}>
            Mail ID
          </Typography>
          <Typography variant="subtitle2">Vider@gmail.com</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2" sx={{ opacity: 0.4 }}>
            Number of client users added
          </Typography>
          <Typography variant="subtitle2">7</Typography>
        </Box>
        <IconButton onClick={handleMenu}>
          <MoreVertIcon />
        </IconButton>
      </Paper>
      <Typography mt={1} variant="h6" color="#0D47A1">
        Client users
      </Typography>
      <Grid container justifyContent="flex-start" alignItems="center">
        <Grid item xs={4}>
          <ClientUserCard />
        </Grid>
        <Grid item xs={4}>
          <ClientUserCard />
        </Grid>
        <Grid item xs={4}>
          <ClientUserCard />
        </Grid>
      </Grid>
      <Box sx={{ padding: "18px", textAlign: "right" }}>
        <Button variant="contained" color="secondary">
          Save Changes
        </Button>
      </Box>
    </Box>
  );
};

export default ClientGroupTeamView;

function ClientUserCard() {
  return (
    <Paper
      sx={{
        padding: "24px",
        m: 1,
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
      }}
    >
      <Checkbox
        sx={{
          color: "#F2353C",
          "&.Mui-checked": {
            color: "#F2353C",
          },
        }}
        defaultChecked
      />
      <div>
        <Typography variant="subtitle2">Alice Estrada</Typography>
        <Typography color="#0D47A1" variant="subtitle2">
          9638527419,vider@gmail.com
        </Typography>
      </div>
    </Paper>
  );
}
