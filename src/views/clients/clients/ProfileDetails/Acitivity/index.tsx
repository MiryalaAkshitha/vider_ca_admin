import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import { Box, Typography } from "@mui/material";

const activityItems = [
  {
    date: "21 December, 2021",
    time: "03:45 PM",
    action: "Client Added",
    remakrs: "Client added by sai veer with GSTIN number - 21APKSF2125R1ZE",
  },
  {
    date: "21 December, 2021",
    time: "03:45 PM",
    action: "Client Added",
    remakrs: "Client added by sai veer with GSTIN number - 21APKSF2125R1ZE",
  },
  {
    date: "21 December, 2021",
    time: "03:45 PM",
    action: "Client Added",
    remakrs: "Client added by sai veer with GSTIN number - 21APKSF2125R1ZE",
  },
  {
    date: "21 December, 2021",
    time: "03:45 PM",
    action: "Client Added",
    remakrs: "Client added by sai veer with GSTIN number - 21APKSF2125R1ZE",
  },
];

function Activity() {
  return (
    <Box width={1000} mt={4}>
      <Typography variant="subtitle1" gutterBottom color="primary">
        Activity Log
      </Typography>
      <Timeline>
        {activityItems.map((item, index) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{
                flex: "none",
                paddingRight: "40px",
              }}
              color="text.secondary"
            >
              <Box
                sx={{
                  background: "#0D47A11A",
                  px: 2,
                  py: 1,
                  width: 240,
                  position: "relative",
                  "&:before": {
                    content: "''",
                    position: "absolute",
                    bottom: 0,
                    width: 0,
                    height: 0,
                    left: "100%",
                    borderLeft: "20px solid #0D47A11A",
                    borderTop: "35px solid transparent",
                    borderBottom: "35px solid transparent",
                  },
                }}
              >
                <Typography variant="subtitle2" color="primary">
                  {item.date}
                </Typography>
                <Typography variant="caption" color="rgba(0,0,0,0.4)">
                  {item.time}
                </Typography>
              </Box>
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot
                sx={{ background: "#F9FAFC", border: "3px solid #0D47A11A" }}
              />
              <TimelineConnector sx={{ background: "#0D47A11A" }} />
            </TimelineSeparator>
            <TimelineContent>
              <Box
                sx={{
                  border: "1px solid #E1E9F8",
                  borderRadius: "10px",
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" color="primary">
                  {item.action}
                </Typography>
                <Typography variant="body2" color="rgba(0,0,0,0.6)">
                  {item.remakrs}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}

export default Activity;
