import {
  Avatar,
  Box,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const ChatItem = ({ data, selected, onClick }) => {
  return (
    <ListItemButton
      selected={selected}
      sx={{
        position: "relative",
        ...(selected && {
          "&:before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "2px",
            background: "#2196f3",
            borderRadius: "2px",
          },
        }),
      }}
      onClick={() => onClick(data)}
    >
      <ListItemAvatar>
        <Avatar src={data?.image || ""} />
      </ListItemAvatar>
      <ListItemText
        primary={data?.name}
        secondary={
          <Typography
            variant="caption"
            sx={{
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "block",
              whiteSpace: "nowrap",
            }}
          >
            {data?.lastMessage}
          </Typography>
        }
      />
      {data?.unread ? (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            right: 10,
            background: "#F1A07F",
            color: "white",
            borderRadius: "50%",
            width: 20,
            height: 20,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="caption" sx={{ fontSize: 10 }}>
            {data?.unread}
          </Typography>
        </Box>
      ) : null}
    </ListItemButton>
  );
};

export default ChatItem;
