import { AssignmentOutlined, MoreVert } from "@mui/icons-material";
import { Divider, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useMenu } from "context/MenuPopover";
import moment from "moment";
import { useState } from "react";
import { getTitle } from "utils";
import EditRecurringTask from "./EditRecurringTask";

interface Props {
  data: any;
}

const RecurringTaskItem = ({ data }: Props) => {
  const menu = useMenu();
  const [open, setOpen] = useState(false);

  const handleMenu = (e: any) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setOpen(true),
        },
      ],
    });
  };

  return (
    <Box mb={3}>
      <Box display="flex" justifyContent="space-between" gap={3}>
        <Box display="flex" gap={2} alignItems="center" flex={1}>
          <Box bgcolor="white" borderRadius={2}>
            <AssignmentOutlined fontSize="medium" />
          </Box>
          <Box>
            <Typography variant="body1" color="primary">
              {data?.name}
            </Typography>
            <Typography variant="caption">
              {getTitle(data?.recurringStatus)}
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography variant="caption">Start Date</Typography>
          <Typography variant="body1" color="primary">
            {moment(data?.taskStartDate).format("DD MMM YYYY")}
          </Typography>
        </Box>
        {data?.recurringStatus === "pending" && (
          <Box>
            <IconButton onClick={handleMenu}>
              <MoreVert />
            </IconButton>
          </Box>
        )}
      </Box>
      <Divider sx={{ mt: 2 }} />
      <EditRecurringTask open={open} data={data} setOpen={setOpen} />
    </Box>
  );
};

export default RecurringTaskItem;
