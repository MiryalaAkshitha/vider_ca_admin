import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";

type Props = {
  data: any;
};

function TaskComment({ data }: Props) {
  return (
    <Box mt={4} borderBottom="1px solid rgba(0,0,0,0.08)" pb={3}>
      <Box maxWidth={1000}>
        <Box mb={2} display="flex" gap={2} alignItems="center">
          <Avatar src="https://picsum.photos/200" />
          <div>
            <Typography variant="body1">
              {data?.user?.firstName + " " + data?.user?.lastName}
            </Typography>
            <Typography variant="caption" color="rgba(0,0,0,0.5)">
              {moment(data?.createdAt).calendar()}
            </Typography>
          </div>
        </Box>
        <Typography variant="body2" color="rgba(0,0,0,0.8)">
          {data?.text}
        </Typography>
      </Box>
    </Box>
  );
}

export default TaskComment;
