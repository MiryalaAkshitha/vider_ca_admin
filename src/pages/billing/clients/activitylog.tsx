import { Box, IconButton, Typography, Button, Stack } from "@mui/material";

import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getDuration } from "utils/getDuration";
import { StyledTaskBox } from "views/dashboard/OrgDashboard/styles";
import Divider from "@mui/material/Divider";
import moment from "moment";
import { useParams } from "react-router-dom";
import { StyledTimelineIcon } from "views/clients/styles";
import Timeline from "@mui/lab/Timeline";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import { getCommonBilling } from "api/services/reports";
import { handleError } from "utils/handleError";
import { snack } from "components/toast";
function ActivityLog() {
  const params = useParams();
  const [activitylogs, setActivitylogs] = useState([]);
  const { data: result, isLoading, error }: ResType = useQuery(
    ['clientdashboardactivitylog', {
        query: 'clientdashboardactivitylog',
        clientId: params.clientId
    }],
    getCommonBilling, {
    onSuccess: (res: any) => {
      setActivitylogs(res?.data);
        console.log("activity", res?.data)
    },
    onError: (err: any) => {
        snack.error(handleError(err));
    },
});
  
  return (
    <>
    {activitylogs?.map((item : any) => (
      // <StyledTaskBox
      //   sx={{
      //     width: "700px",
      //     height: "900px",
      //   }}
      // >
        
        <Timeline>
          <TimelineItem>
            <TimelineOppositeContent
              sx={{
                flex: "none",
                paddingRight: "40px",
              }}
              color="text.secondary"
            >
              <StyledTimelineIcon>
                <Typography variant="subtitle2" color="primary">
                  {moment(item.created_at).format('DD-MM-YYYY')}
                </Typography>
                <Typography variant="caption" color="rgba(0,0,0,0.4)">
                {moment(item.created_at).format("hh:mm A")}
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
                  width:"300px",
                  p: 2,
                  mb: 2,
                }}
              >
                <Typography variant="subtitle2" color="primary">
                  {item.label}
                </Typography>
                <Typography variant="body2" color="rgba(0,0,0,0.6)">
                Rs.{item.amount}
                </Typography>
              </Box>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
        
       
      // </StyledTaskBox>
      ))}
    </>
  );
}

export default ActivityLog;
