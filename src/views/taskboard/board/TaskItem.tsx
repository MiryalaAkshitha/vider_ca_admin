import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { endTimer, startTimer } from "api/tasks";
import { icons } from "assets";
import useSnack from "hooks/useSnack";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import Timer from "./timer";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { Link } from "react-router-dom";

function TaskItem({ data }: any) {
  const snack = useSnack();
  const [showTimer, setShowTimer] = useState(false);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    const existingTimer = data?.taskLogHours?.find(
      (item: any) => item.status === "started"
    );
    if (existingTimer) {
      setShowTimer(true);
      setStartTime(existingTimer?.startTime);
    }
  }, [data, startTime]);

  const { mutate } = useMutation(startTimer, {
    onSuccess: () => {
      snack.success("Timer Started");
      setShowTimer(true);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: endTaskTimer } = useMutation(endTimer, {
    onSuccess: () => {
      snack.success("Timer Ended");
      setShowTimer(false);
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

  const handleEndTimer = () => {
    endTaskTimer({
      taskId: data.id,
      endTime: new Date().getTime(),
    });
  };

  return (
    <Link
      to={`/task-details/${data?.taskId}`}
      style={{ textDecoration: "none", color: "initial" }}
    >
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
          {showTimer ? (
            <>
              <StopCircleOutlinedIcon
                onClick={handleEndTimer}
                titleAccess="End Timer"
                sx={{ fontSize: 16, cursor: "pointer" }}
              />
              <Timer startTime={startTime} />
            </>
          ) : (
            <AccessAlarmRoundedIcon
              titleAccess="Start Timer"
              onClick={handleStartTimer}
              sx={{ fontSize: 16, cursor: "pointer" }}
            />
          )}
        </Box>
      </Box>
    </Link>
  );
}

export default TaskItem;
