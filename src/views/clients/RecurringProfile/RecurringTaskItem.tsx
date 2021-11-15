import { AssignmentOutlined } from "@mui/icons-material";
import { Divider, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import { getTitle } from "utils";

interface Props {
  data: any;
}

const RecurringTaskItem = ({ data }: Props) => {
  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between" gap={3}>
        <Box display="flex" gap={2} alignItems="center">
          <Box bgcolor="white" borderRadius={2}>
            <AssignmentOutlined fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="body1" color="primary">
              {data?.name}
            </Typography>
            <Typography variant="caption">{getTitle(data?.status)}</Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption">Recurring Date</Typography>
          <Typography variant="body1" color="primary">
            {moment(data?.recurringDate).format("DD MMM YYYY")}
          </Typography>
        </Box>
      </Box>
      <Divider sx={{ mt: 2 }} />
    </Box>
  );
};

export default RecurringTaskItem;
