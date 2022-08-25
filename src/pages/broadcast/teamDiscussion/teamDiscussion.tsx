import { Box, Grid } from "@mui/material";
import ChannelsMembers from "views/broadcast/teamDiscussion/channelsMembers";
import ParticularChanelMessage from "views/broadcast/teamDiscussion/particularChanelMessage";
import ChatInput from "views/chats/Chat/ChatInput";

const teamDiscussion = () => {
  return (
    <Box p={2}>
      <Grid
        container
        sx={{
          // border: "1px solid red",
          height: "550px",
        }}
      >
        <Grid item xs={3}>
          <Box sx={{ height: "550px", backgroundColor: "lightgrey", margin: "8px" }}>
            <ChannelsMembers />
          </Box>
        </Grid>
        <Grid item xs={9}>
          <Box
            sx={{
              height: "500px",
              border: "1px solid lightgrey",
              margin: "8px",
              overflow: "auto",
            }}
          >
            <ParticularChanelMessage />
          </Box>
          <ChatInput />
        </Grid>
      </Grid>
    </Box>
  );
};

export default teamDiscussion;
