import { Box, Typography } from "@mui/material";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Members from "components/Members";
import moment from "moment";
import LocationOnIcon from "@mui/icons-material/LocationOn";

function EventCard({ data }: any) {
  return (
    <Box
      sx={{
        bgcolor: "#F7F7F7",
        borderRadius: "4px",
        p: 2,
        height: "100%",
      }}
    >
      <Box display="flex" gap={1}>
        <EventAvailableIcon sx={{ mt: 1 }} />
        <Box flex={1}>
          <Box display="flex" gap={2} justifyContent="space-between">
            <div>
              <Typography variant="subtitle2" color="primary">
                {data?.title}
              </Typography>
              <Typography variant="caption" color="rgba(0,0,0,0.7)">
                {moment(data?.date).format("MMM DD, YYYY")},{" "}
                {moment(data?.date)
                  .add(data?.startTime, "minutes")
                  .format("h:mm a")}{" "}
                -{" "}
                {moment(data?.date)
                  .add(data?.endTime, "minutes")
                  .format("h:mm a")}
              </Typography>
            </div>
            <Members
              data={
                data?.members?.map((item) => ({
                  src: "",
                  title: item?.fullName,
                })) || []
              }
            />
          </Box>
          <Box display="flex" alignItems="center" gap="2px" mb={1}>
            <LocationOnIcon sx={{ fontSize: 14, color: "rgba(0,0,0,0.3)" }} />
            <Typography variant="caption" color="rgba(0,0,0,0.7)">
              {data?.location}
            </Typography>
          </Box>
          <Typography variant="body2" color="rgba(0,0,0,0.7)">
            {data?.reminderNotes}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default EventCard;
