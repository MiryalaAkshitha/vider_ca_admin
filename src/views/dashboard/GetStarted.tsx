import { Box } from "@mui/system";
import { Grid, Typography, Button } from "@mui/material";
import { icons } from "assets";
import GetStartedCard from "./GetStartedCard";

const GetStarted = () => {
  return (
    <>
      <Box p={3}>
        <Grid container>
          <Grid item xs={6}>
            <Box>
              <Typography variant="subtitle1">
                Get started with Vider practice management platform
              </Typography>
              <Typography mt={1} variant="body1">
                The following are the steps to follow to add new users, clients,
                Tasks and events which will help you do the bait functionalities
                in the vider practice management platform
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
            >
              <Button variant="contained" color="error">
                Skip these steps
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Box mt={4}>
          <GetStartedCard
            active={true}
            img={icons.socialmedia_PosterImage}
            title="Add a new User"
            desc="Add a user or Team member to work with"
            btnTitle="Add new client"
            btnAction={() => {}}
          />
          <GetStartedCard
            active={true}
            img={icons.handshake_PosterImage}
            title="Add a new client"
            desc="Add a new client with their basic details"
            btnTitle="Add new client"
            btnAction={() => {}}
          />
          <GetStartedCard
            active={false}
            img={icons.checklist_PosterImage}
            title="Add a new Task"
            desc="Add a new Task and assign them to added users"
            btnTitle="Add new Task"
            btnAction={() => {}}
          />
          <GetStartedCard
            active={false}
            img={icons.calendar_PosterImage}
            title="Add a new Event"
            desc="Add a New event in calendar and set reminder for the events."
            btnTitle="Add new Event"
            btnAction={() => {}}
          />
        </Box>
      </Box>
    </>
  );
};
export default GetStarted;
