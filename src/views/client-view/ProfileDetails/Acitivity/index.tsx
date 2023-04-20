import Loader from "components/Loader";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { Box, Typography } from "@mui/material";
import { getActivity } from "api/services/common";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import moment from "moment";
import { getTitle } from "utils";
import { StyledTimelineIcon } from "views/clients/styles";
import React from "react";

function Activity() {
  const params = useParams();

  const { isLoading, data }: ResType = useQuery(
    ["activity", { type: "clients", typeId: params.clientId }],
    getActivity
  );

  if (isLoading) return <Loader />;

  return (
    <Box width={1000} mt={4}>
      <Typography variant="h6" gutterBottom color="primary">
        {/* Activity Log */}
      </Typography>
      <Timeline>
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
              <TimelineDot sx={{ background: "#F9FAFC", border: "3px solid #0D47A11A" }} />
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

export default React.memo(Activity);
