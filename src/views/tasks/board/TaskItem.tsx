import AccessAlarmRoundedIcon from "@mui/icons-material/AccessAlarmRounded";
import StopCircleOutlinedIcon from "@mui/icons-material/StopCircleOutlined";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { endTimer, startTimer } from "api/services/tasks";
import { icons } from "assets";
import Members from "components/Members";
import PriorityText from "components/PriorityText";
import { snack } from "components/toast";
import _ from "lodash";
import moment from "moment";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTimerRunning } from "redux/reducers/globalSlice";
import { formattedDatetime } from "utils/formattedDateTime";
import Timer from "./timer";

type Props = {
  data: any;
};

function TaskItem({ data }: Props) {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showTimer, setShowTimer] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [timerId, setTimerId] = useState<number | null>(null);

  useEffect(() => {
    const existingTimer = data?.taskLogHours?.find(
      (item: any) => item.status === "started"
    );

    if (existingTimer) {
      setShowTimer(true);
      dispatch(setTimerRunning(true));
      setTimerId(existingTimer?.id);
      setStartTime(existingTimer?.startTime);
    }
  }, [data, startTime, dispatch]);

  const { mutate } = useMutation(startTimer, {
    onSuccess: () => {
      snack.success("Timer Started");
      queryClient.invalidateQueries("tasks");
      setShowTimer(true);
      dispatch(setTimerRunning(true));
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
      dispatch(setTimerRunning(false));
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

  const getApprovalUpdate = (approvals: any[]) => {
    const sorted = _.sortBy(approvals, "level");
    const lastApprovedIndex = _.findLastIndex(sorted, { status: "APPROVED" });
    const allApproved = _.every(sorted, { status: "APPROVED" });

    if (allApproved) return `All approvals have been approved`;

    return `Level ${lastApprovedIndex + 1} has been approved`;
  };

  const getLastApprovedDate = (approvals: any[]) => {
    const sorted = _.sortBy(approvals, "level");
    const lastApprovedIndex = _.findLastIndex(sorted, { status: "APPROVED" });

    return formattedDatetime(sorted[lastApprovedIndex]?.updatedAt);
  };

  return (
    <>
      <Box
        px={2}
        onClick={() => {
          navigate(`/task-board/${data?.id}#details`);
        }}
        py={1}
        sx={{ cursor: "pointer" }}
      >
        <Box display="flex" justifyContent="space-between">
          <Typography variant="body2" color="gray">
            {data?.taskNumber}
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
            {data?.recurring && (
              <img
                style={{ textAlign: "right" }}
                src={icons.recurring}
                alt=""
              />
            )}
          </Box>
          <Typography variant="caption" color="gray">
            Sub Tasks: ({data?.subTasks.length})
          </Typography>
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
            size="small"
            data={data?.members?.map((item: any) => ({
              src: item?.imageUrl,
              title: item?.fullName,
            }))}
          />
        </Box>
      </Box>
      {data?.approvals?.length > 0 && (
        <Box sx={{ p: "6px", borderTop: "1px solid rgba(0,0,0,0.1)" }}>
          {_.some(data?.approvals, { status: "APPROVED" }) ? (
            <>
              <Typography variant="body2">
                {getApprovalUpdate(data?.approvals)}
              </Typography>
              <Typography variant="caption" color="rgba(0,0,0,0.5)">
                Last Updated on {getLastApprovedDate(data?.approvals)}
              </Typography>
            </>
          ) : (
            <Typography variant="body2" textAlign="center">
              Approval Levels ({data?.approvals.length})
            </Typography>
          )}
        </Box>
      )}
    </>
  );
}

export default TaskItem;
