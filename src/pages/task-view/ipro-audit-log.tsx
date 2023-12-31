import {
  Timeline,
  TimelineItem,
  TimelineOppositeContent,
  TimelineSeparator,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@mui/lab";
import { Box, Typography } from "@mui/material";
import { getFormActivity } from "api/services/forms";
import Loader from "components/Loader";
import moment from "moment";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import { StyledTimelineIcon } from "views/clients/styles";

function IProAuditLog() {
  const params = useParams();

  const { data, isLoading }: ResType = useQuery(
    ["form-activity", params.formId],
    getFormActivity
  );

  if (isLoading) return <Loader />;

  return (
    <Box maxWidth={1000} margin="auto">
      <Timeline sx={{ margin: "0" }}>
        {data?.data?.map((item: any, index: number) => (
          <TimelineItem key={index}>
            <TimelineOppositeContent
              sx={{
                flex: "none",
                paddingRight: "40px",
              }}
              color="text.secondary"
            >
              <StyledTimelineIcon>
                <Typography variant="subtitle2" color="primary">
                  {moment(item.createdAt).format("MMM DD, YYYY")}
                </Typography>
                <Typography variant="caption" color="rgba(0,0,0,0.4)">
                  {moment(item.createdAt).format("hh:mm A")}
                </Typography>
              </StyledTimelineIcon>
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
                  {getTitle(item?.action)}
                </Typography>
                <Typography variant="body2" color="rgba(0,0,0,0.6)">
                  {item?.remarks}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </Box>
  );
}

export default IProAuditLog;
