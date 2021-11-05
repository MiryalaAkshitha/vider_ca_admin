import { Box } from "@mui/system";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import { Typography } from "@mui/material";

function Details() {
  return (
    <Box height="100vh">
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" gap={2}>
          <div>
            <AssignmentOutlinedIcon />
          </div>
          <div>
            <Typography variant="subtitle1" color="primary">
              Company Registration
            </Typography>
            <Typography variant="body2" color="gray">
              Created by shashank Preetham on 02/Aug/2021, 01:37 PM
            </Typography>
          </div>
        </Box>
      </Box>
    </Box>
  );
}

export default Details;
