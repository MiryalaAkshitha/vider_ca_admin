import { Avatar, Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";

function NotificationItem({ data }) {
  return (
    <Box mb={2}>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          pb: 1,
        }}
      >
        <Avatar
          sx={{ mt: "5px" }}
          src={data?.user?.imageUrl || ""}
          alt="Remy Sharp"
        />
        <Box flex={1}>
          <Typography variant="body1">{data?.title}</Typography>
          <Typography variant="caption" color="rgba(0,0,0,0.6)">
            {data?.body}
          </Typography>
        </Box>
        <Typography variant="caption">
          {moment(data.createdAt).fromNow()}
        </Typography>
      </Box>
      <Divider />
    </Box>
  );
}

export default NotificationItem;
