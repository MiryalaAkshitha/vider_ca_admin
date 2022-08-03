import { Grid, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { getTask } from "api/services/tasks/tasks";
import { useQuery } from "react-query";
import { ResType } from "types";

function TaskDetails({ taskId }: any) {
  const { data }: ResType = useQuery(["task-info", taskId], getTask, {
    enabled: Boolean(taskId),
  });

  const personName = data?.data?.taskLeader
    ? data.data.taskLeader.fullName
    : data?.data?.user?.fullName;
  const personNumber = data?.data?.taskLeader
    ? data.data.taskLeader.mobileNumber
    : data?.data?.user?.mobileNumber;
  const orgName = data?.data?.organization?.organizationName;

  return (
    <Box sx={{ background: "rgba(24, 47, 83, 0.06)", p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Detail title="Task Name" value={data?.data?.name} />
        </Grid>
        <Grid item xs={4}>
          <Detail title="Task ID" value={data?.data?.taskId} />
        </Grid>
        <Grid item xs={4}>
          <Detail title="Task due date" value={data?.data?.dueDate} />
        </Grid>
        <Grid item xs={4}>
          <Detail title="Organization name" value={orgName || "--"} />
        </Grid>
        <Grid item xs={4}>
          <Detail title="Responsible person name" value={personName || "--"} />
        </Grid>
        <Grid item xs={4}>
          <Detail
            title="Responsible person mobile"
            value={personNumber || "--"}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

const Detail = ({ title, value }) => {
  return (
    <Box>
      <Typography variant="caption" color="rgba(0,0,0,0.6)">
        {title}:
      </Typography>
      <Typography variant="h6" color="primary">
        {value}
      </Typography>
    </Box>
  );
};

export default TaskDetails;
