import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { endTimer, startTimer } from "api/services/tasks";
import { icons } from "assets";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import useSnack from "hooks/useSnack";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import Timer from "./timer";

type Props = {
  data: any;
};

function TaskItem({ data }: Props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const snack = useSnack();
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<number | null>(null);

  useEffect(() => {
    const existingTimer = data?.taskLogHours?.find(
      (item: any) => item.status === "started"
    );

    if (existingTimer) {
      setShowTimer(true);
      setTimerId(existingTimer?.id);
      setStartTime(existingTimer?.startTime);
    }
  }, [data, startTime]);

  const { mutate } = useMutation(startTimer, {
    onSuccess: () => {
      snack.success("Timer Started");
      queryClient.invalidateQueries("tasks");
      setShowTimer(true);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: endTaskTimer } = useMutation(endTimer, {
    onSuccess: () => {
      snack.success("Timer Ended");
      queryClient.invalidateQueries("tasks");
      setShowTimer(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleStartTimer = (e: any) => {
    e.stopPropagation();
    setStartTime(new Date().getTime());
    mutate({
      taskId: data.id,
      startTime: new Date().getTime(),
    });
  };

  const handleEndTimer = (e: any) => {
    e.stopPropagation();
    endTaskTimer({
      id: timerId!,
      endTime: new Date().getTime(),
    });
  };

  return (
    <>
      <Box
        px={2}
        onClick={() => {
          navigate(
            `/task-board/${data?.id}?clientId=${data?.client?.clientId}`
          );
        }}
        py={1}
        sx={{ cursor: "pointer" }}
      >
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
            {data?.name} -{" "}
            <span style={{ color: data?.category?.color }}>
              {data?.category?.name}
            </span>
          </Typography>
          <Box display="flex" justifyContent="space-between">
            <div>
              <Typography variant="caption" color="gray">
                Due Date:{" "}
                {data?.dueDate && moment(data?.dueDate).format("DD MMM YYYY")}
              </Typography>
            </div>
            <Typography variant="caption" color="gray"></Typography>
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
        px={1}
        py={1}
        mt={1}
        gap="10px"
        borderTop="1px solid rgba(0,0,0,0.1)"
      >
        {data?.priority !== "none" && (
          <PriorityText variant="body2" text={data?.priority} />
        )}
        <Box
          onClick={handleEndTimer}
          display="flex"
          alignItems="center"
          gap="5px"
        >
          {showTimer ? (
            <>
              <StopCircleOutlinedIcon
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
        <Box flex={1} display="flex" justifyContent="flex-end">
          <Members
            data={data?.members?.map((item) => ({
              src: "",
              title: item?.fullName,
            }))}
          />
        </Box>
      </Box>
    </>
  );
}

export default TaskItem;
