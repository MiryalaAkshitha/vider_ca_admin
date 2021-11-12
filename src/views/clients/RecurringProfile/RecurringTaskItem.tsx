import { AssignmentOutlined } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";

const RecurringTaskItem = () => {
  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between" gap={3}>
        <Box display="flex" gap={2} alignItems="center">
          <Box bgcolor="white" borderRadius={2}>
            <AssignmentOutlined fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="body1" color="primary">
              Company Registration
            </Typography>
            <Typography variant="caption">
              Completed on 02 Aug 2021, 01:37 PM
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption">Recurring Date</Typography>
          <Typography variant="body1" color="primary">
            02 Aug 2021
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default RecurringTaskItem;
