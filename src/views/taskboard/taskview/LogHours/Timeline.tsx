import { Box, Typography } from "@mui/material";
import { useTaskData } from "context/TaskData";
import moment from "moment";
import { useState } from "react";
import { getTitle } from "utils";
import { TaskStatus } from "utils/constants";
import { StyledTimline } from "views/taskboard/styles";
import ViewRemark from "./ViewRemark";

function Timeline({ data }: any) {
  const taskData: any = useTaskData();
  const [open, setOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
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
                    moment
                      .utc(data?.data?.timeline[status])
                      .local()
                      .format("MM/DD/YYYY, h:mm a")}
                </Typography>{" "}
                <br />
                {status === TaskStatus.ON_HOLD && data?.data?.timeline[status] && (
                  <Typography
                    onClick={() => {
                      setOpen(true);
                      setContent(taskData?.remarks);
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
                        setOpen(true);
                        setContent(taskData?.terminationReason);
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
      <ViewRemark open={open} setOpen={setOpen} content={content} />
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
