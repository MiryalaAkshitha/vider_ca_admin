import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";

interface Props {
  state: any;
}

function Info({ state }: Props) {
  return (
    <Box display="flex" p={3} bgcolor="#FBF9F2" justifyContent="space-between">
      <Box display="flex" gap={2} alignItems="center">
        <Box bgcolor="white" p={2} borderRadius={2}>
          <AssignmentOutlinedIcon fontSize="medium" />
        </Box>
        <div>
          <Typography variant="subtitle2" color="primary">
            {state?.name}{" "}
          </Typography>
          <Typography variant="body2" color="gray">
            Created by {state?.user?.fullName} on{" "}
            {moment(state?.createdAt).format("MMM Do YYYY, hh:mm a")}{" "}
            {state?.parentTask && (
              <>
                - Sub task of{" "}
                <Link
                  style={{
                    color: "#4a89dc",
                  }}
                  to={`/task-board/${state?.parentTask?.id}`}
                >
                  {" "}
                  {state?.parentTask?.name}
                </Link>
              </>
            )}
          </Typography>
        </div>
      </Box>
      <Box textAlign="right">
        <Typography variant="body2" color="gray">
          Task ID
        </Typography>
        <Typography variant="subtitle2" color="primary">
          {state?.taskNumber}
        </Typography>
      </Box>
    </Box>
  );
}

export default Info;
