import { DeleteOutlined } from "@mui/icons-material";
import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Box, Button } from "@mui/material";
import { deleteTask } from "api/services/tasks";
import BreadCrumbs from "components/BreadCrumbs";
import { useConfirm } from "components/ConfirmDialogProvider";
import { TaskDataContext } from "context/TaskDataContext";
import useSnack from "hooks/useSnack";
import { useContext, useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { taskViewMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem,
} from "views/clients/clients/styles";
import TerminationDialog from "views/taskboard/taskview/TerminationDialog";

function TaskHeader({ onChange }: any) {
  const confirm = useConfirm();
  const snack = useSnack();
  const navigate = useNavigate();
  const { taskData }: any = useContext(TaskDataContext);
  const [open, setOpen] = useState(false);

  const { mutate: taskDelete } = useMutation(deleteTask, {
    onSuccess: (res) => {
      navigate("/task-board");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this task?",
      action: () => {
        taskDelete({
          id: taskData?.id,
        });
      },
    });
  };

  const taskMenu = () => {
    if (taskData?.parentTask) {
      return taskViewMenu.filter((item) => item.id !== "subtasks");
    }
    return taskViewMenu;
  };

  return (
    <Box position="sticky" top={55} zIndex={2}>
      <Box p={2} bgcolor="white" display="flex" justifyContent="space-between">
        <BreadCrumbs page="taskView" />
        <Box display="flex" gap={1}>
          <Button
            onClick={() => setOpen(true)}
            startIcon={<CancelPresentationIcon color="secondary" />}
          >
            Terminate task
          </Button>
          <Button
            onClick={handleDelete}
            startIcon={<DeleteOutlined color="secondary" />}
          >
            Delete task
          </Button>
        </Box>
      </Box>
      <StyledProfileNav>
        {taskMenu().map((item, index) => (
          <StyledProfileNavItem
            onClick={() => onChange(item)}
            key={index}
            active={window.location.hash?.replace("#", "") === item.id ? 1 : 0}
          >
            {item.label}
          </StyledProfileNavItem>
        ))}
      </StyledProfileNav>
      <TerminationDialog open={open} setOpen={setOpen} />
    </Box>
  );
}

export default TaskHeader;
