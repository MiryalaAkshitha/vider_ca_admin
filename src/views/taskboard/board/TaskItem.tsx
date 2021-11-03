import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import { Link } from "react-router-dom";

function TaskItem({ data }: any) {
  return (
    <Link
      to={`/task-details/${data?.uid}`}
      style={{ textDecoration: "none", color: "initial" }}
    >
      <Box px={2} py={1} sx={{ cursor: "pointer" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="gray">
            VD4832
          </Typography>
          <Typography variant="body2" color="gray">
            Roy Capital
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body1" gutterBottom color="primary">
            {data?.name}
          </Typography>
          <Typography variant="caption" color="gray">
            Due Date : 16 July, 2021
          </Typography>
        </Box>
      </Box>
      <Box
        display="flex"
        px={2}
        py={1}
        mt={1}
        gap="10px"
        borderTop="1px solid rgba(0,0,0,0.1)"
      >
        <Box display="flex" alignItems="center" gap="5px">
          <ArrowUpwardRoundedIcon sx={{ fontSize: 16 }} color="secondary" />
          <Typography variant="caption">High</Typography>
        </Box>
        <Box display="flex" alignItems="center" gap="5px">
          <AccessAlarmRoundedIcon
            sx={{ fontSize: 16, cursor: "pointer", color: "GrayText" }}
          />
          <Typography variant="caption" color="gray">
            03:45:54
          </Typography>
        </Box>
      </Box>
    </Link>
  );
}

export default TaskItem;
