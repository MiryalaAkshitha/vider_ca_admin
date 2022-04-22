import { Box, Grid, Typography } from "@mui/material";
import { newlogo, signup } from "assets";
import { BackgroundImage, LogoContainer } from "views/login/styles";

function BackgroundWrapper({ children }: any) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6} lg={6}>
        <BackgroundImage>
          <LogoContainer>
            <img src={newlogo} alt="" />
            <Box mt={6}>
              <img src={signup} alt="" />
            </Box>
            <Typography mt={2} variant="subtitle2" color="white">
              Vider Practice Management software
            </Typography>
            <Typography mt={1} variant="body2" color="rgba(255,255,255,0.7)">
              Praesent eu dolor eu orci vehicula euismod. Vivamus sed
              sollicitudin libero, vel malesuada velit. Nullam et maximus lorem.
              Suspendisse maximus dolor quis consequat volutpat donec vehicula
              elit eu erat pulvinar.
            </Typography>
          </LogoContainer>
        </BackgroundImage>
      </Grid>
      <Grid xs={6} lg={6} item>
        <Box
          width="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
          sx={{ overflowY: "auto" }}
        >
          <Box maxWidth="400px" width="100%" pt={8} pb={4}>
            {children}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default BackgroundWrapper;
