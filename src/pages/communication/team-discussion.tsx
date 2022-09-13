import { Box,Divider } from "@mui/material";
// import DiscussionChats from "views/team-discussions/chats";
// import UserGroups from "views/team-discussions/user-groups";
// import DiscussionMember from "views/team-discussions/Members/DiscussionMember";
// import Chat from "views/chats/Chat";

function TeamDiscussion() {
  return (
    <Box p={2} sx={{display:"flex",gap:"10px"}}>
      <Box sx={{ height: "80vh", width: "340px", border: "0.5px solid grey" }}>
        {/* <DiscussionChats/> */}
        <Divider/>
        {/* <UserGroups /> */}
        <Divider/>
        {/* <DiscussionMember/> */}

      </Box>
      <Box sx={{ flex: "auto", border: "0.5px solid grey" }}>
        {/* <Chat/> */}
        </Box>
    </Box>
  );
}

export default TeamDiscussion;
