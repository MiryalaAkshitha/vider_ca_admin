import { Box, Typography, Paper, Grid, Container } from "@mui/material";
import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FloatingButton from "components/FloatingButton";
import { useState } from "react";
import EditGroup from "views/broadcast/groups/editGroup";
import { Link } from "react-router-dom";

const ParticularGroups = () => {
  const [open, setOpen] = useState(false);

  return (
    <Box>
      <Paper
        sx={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          height: "80px",
        }}
      >
        <Link to="/brodcast/groups" style={{ textDecoration: "none", color: "initial" }}>
          <ArrowBackIcon sx={{ marginRight: "8px" }} />
        </Link>

        <Typography variant="h6">Group GST</Typography>
      </Paper>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          borderBottom: "#000000",
        }}
      >
        <Paper
          sx={{
            padding: "12px",
            marginTop: "12px",
            marginBottom: "12px",
            backgroundColor: "lightyellow",
            opacity: "0.6",
          }}
        >
          <Typography variant="subtitle2">Group name 1</Typography>
          <Typography variant="caption">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque modi nemo iusto eaque laborum illum
            veniam asperiores ullam deleniti! Natus quo, officia rerum ea odio saepe exercitationem tenetur
            omnis quaerat?
          </Typography>
        </Paper>
        <Grid container spacing={2} justifyContent="flex-start" alignItems="center">
          <Grid item xs={2}>
            <ParticularGroupCard />
          </Grid>
          <Grid item xs={2}>
            <ParticularGroupCard />
          </Grid>
          <Grid item xs={2}>
            <ParticularGroupCard />
          </Grid>
          <Grid item xs={2}>
            <ParticularGroupCard />
          </Grid>
          <Grid item xs={2}>
            <ParticularGroupCard />
          </Grid>
        </Grid>
      </Container>
      <FloatingButton
        position="right"
        onClick={() => {
          setOpen(true);
        }}
      />
      <EditGroup open={open} setOpen={setOpen} data="" />
    </Box>
  );
};

export default ParticularGroups;

function ParticularGroupCard() {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px",
        borderRadius: "8px",
      }}
    >
      <MoreVertIcon sx={{ alignSelf: "flex-end" }} />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFtM9OUos7peVr6kw7HAJf8oJLoQy4KTstAA&usqp=CAU"
        alt="personImage"
        style={{ borderRadius: "50px", width: "80px", height: "80px" }}
      />
      <div>
        <Typography variant="body2" align="center">
          Cristiano Ronaldo
        </Typography>
        <Typography variant="caption" align="center">
          vivekmyadaram@vider.in
        </Typography>
      </div>
      <Typography variant="subtitle2" mt={3}>
        Admin
      </Typography>
    </Paper>
  );
}
