import { Box, Typography } from "@mui/material";
import { useTaskData } from "context/TaskData";
import moment from "moment";
import { useState } from "react";
import { getTitle } from "utils";
import { TaskStatus } from "data/constants";
import { StyledTimline } from "views/tasks/styles";
import ViewRemark from "./ViewRemark";

function Timeline({ data }: any) {
  const taskData: any = useTaskData();
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState("");
  const [activities, setActivities] = useState([]);
  

  const formatContent = (isonhold: boolean, task: any) => {
    setOpen(true);
    if(isonhold) {
      const activities = task?.activity && task?.activity.length > 0 ? task?.activity : [];
      setActivities(activities);
    } else {
      setContent(task?.terminationReason);
    }    
  }

  return (
    <>
      <Box>
        <Typography variant="subtitle1" color="primary">
          Timeline
        </Typography>
        <StyledTimline>
          {Object.values(TaskStatus).map(
            (status: TaskStatus, index: number) => (
              <div key={index}>
                <div>
                  <Typography
                    color={getTimelineStatusColor(status)}
                    variant="h6"
                  >
                    {getTitle(status)}
                  </Typography>
                </div>
                <Typography variant="caption">
                  {data?.data?.timeline[status] &&
                    moment(data?.data?.timeline[status]).format(
                      "MM/DD/YYYY, h:mm a"
                    )}
                </Typography>{" "}
                <br />
                {status === TaskStatus.ON_HOLD && data?.data?.timeline[status] && (
                  <Typography
                    onClick={() => {
                      formatContent(true, taskData)                      
                    }}
                    sx={{ cursor: "pointer" }}
                    variant="caption"
                    color="blue"
                  >
                    (Remark)
                  </Typography>
                )}
                {status === TaskStatus.TERMINATED &&
                  data?.data?.timeline[status] && (
                    <Typography
                      onClick={() => {
                        formatContent(false, taskData);                        
                      }}
                      sx={{ cursor: "pointer" }}
                      variant="caption"
                      color="blue"
                    >
                      (Reason)
                    </Typography>
                  )}
              </div>
            )
          )}
        </StyledTimline>
      </Box>
      <ViewRemark open={open} setOpen={setOpen} content={content} activities={activities} />
    </>
  );
}

const getTimelineStatusColor = (status: TaskStatus) => {
  switch (status) {
    case TaskStatus.TODO:
      return "#149ECD";
    case TaskStatus.IN_PROGRESS:
      return "#F7964F";
    case TaskStatus.ON_HOLD:
      return "#F2353C";
    case TaskStatus.DONE:
      return "#019335";
    case TaskStatus.UNDER_REVIEW:
      return "#673AB7";
    default:
  }
};

export default Timeline;
