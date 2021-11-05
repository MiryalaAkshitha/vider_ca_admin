import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { startTimer } from "api/tasks";
import { icons } from "assets";
import useSnack from "hooks/useSnack";
import moment from "moment";
import { useState } from "react";
import { useMutation } from "react-query";
import Timer from "./timer";

function TaskItem({ data }: any) {
  const snack = useSnack();
  const [showTempTimer, setShowTempTimer] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  const { mutate } = useMutation(startTimer, {
    onSuccess: () => {
      snack.success("Timer Started");
      setShowTempTimer(true);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleStartTimer = () => {
    setStartTime(new Date().getTime());
    mutate({
      taskId: data.id,
      startTime: new Date().getTime(),
    });
  };

  const existingTimer = data?.taskLogHours?.find(
    (item: any) => item.status === "started"
  );

  return (
    <>
      <Box px={2} py={1} sx={{ cursor: "pointer" }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="gray">
            {data?.taskId}
          </Typography>
          <Typography variant="body2" color="gray">
            {data?.client?.displayName}
          </Typography>
        </Box>
        <Box mt={2}>
          <Typography variant="body1" gutterBottom color="primary">
            {data?.name}
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="caption" color="gray">
              {data?.dueDate && moment(data?.dueDate).format("DD MMM YYYY")}
            </Typography>
            {data?.recurring && (
              <img
                style={{ textAlign: "right" }}
                src={icons.recurring}
                alt=""
              />
            )}
          </Box>
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
        {data?.priority !== "none" && (
          <Box display="flex" alignItems="center" gap="5px">
            <ArrowUpwardRoundedIcon sx={{ fontSize: 16 }} color="secondary" />
            <Typography sx={{ textTransform: "capitalize" }} variant="caption">
              {data?.priority}
            </Typography>
          </Box>
        )}
        <Box display="flex" alignItems="center" gap="5px">
          <AccessAlarmRoundedIcon
            onClick={handleStartTimer}
            sx={{ fontSize: 16, cursor: "pointer", color: "GrayText" }}
          />
          {existingTimer || showTempTimer ? (
            <Timer startTime={startTime || existingTimer?.startTime} />
          ) : null}
        </Box>
      </Box>
    </>
  );
}

export default TaskItem;
