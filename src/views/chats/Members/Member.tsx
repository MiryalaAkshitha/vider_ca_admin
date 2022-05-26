import {
  Avatar,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function Member({ data, selected, onClick }: any) {
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
        <Avatar src={data?.imageUrl || ""} />
      </ListItemAvatar>
      <ListItemText primary={data?.fullName} />
    </ListItemButton>
  );
}

export default Member;
