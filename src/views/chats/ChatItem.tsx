import { Avatar, Box, Typography } from "@mui/material";

const ChatItem = () => {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        alignItems: "center",
        p: 1,
        cursor: "pointer",
      }}
    >
      <Box display="flex" gap={1} flex={1}>
        <Avatar
          src="https://mui.com/static/images/avatar/1.jpg"
          sx={{ width: 30, height: 30 }}
        />
        <Box>
          <Typography
            variant="body2"
            color="primary"
            sx={{ lineHeight: "12px" }}
          >
            Vinay kumar
          </Typography>
          <Typography color="rgba(0,0,0,0.6)" variant="caption">
            hi is this the work done?
          </Typography>
        </Box>
      </Box>
      <Box textAlign="center">
        <Typography variant="body2" gutterBottom>
          09:25
        </Typography>
        <Box
          sx={{
            width: 25,
            height: 25,
            margin: "auto",
            background: "#F1A07F",
            borderRadius: "50%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="caption">2</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default ChatItem;
