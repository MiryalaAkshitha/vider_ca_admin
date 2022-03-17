import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Box, Button } from "@mui/material";
import { getTask, updateTask } from "api/services/tasks";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
import _ from "lodash";
import { useEffect, useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { taskViewMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem,
  StyledTaskSection,
} from "views/clients/clients/styles";
import Attachments from "views/taskboard/taskview/attachments";
import Checklists from "views/taskboard/taskview/Checklists";
import Comments from "views/taskboard/taskview/comments";
import Description from "views/taskboard/taskview/Description";
import Details from "views/taskboard/taskview/Details";
import DueDiligence from "views/taskboard/taskview/duediligence";
import Events from "views/taskboard/taskview/events";
import Expenditure from "views/taskboard/taskview/expenditure";
import LogHours from "views/taskboard/taskview/LogHours";
import Milestones from "views/taskboard/taskview/Milestones";
import SubTasks from "views/taskboard/taskview/Subtasks";
import TerminationDialog from "views/taskboard/taskview/TerminationDialog";

function TaskDetails() {
  useTitle("Task Details");
  const snack = useSnack();
  const params: any = useParams();
  const [staticState, setStaticState] = useState<any>({});
  const [state, setState] = useState<any>({});
  const [open, setOpen] = useState(false);

  const { isLoading }: ResType = useQuery(["task", params.taskId], getTask, {
    onSuccess: (res: any) => {
      setStaticState(res?.data);
      setState(res?.data);
    },
    cacheTime: 0,
  });

  let isClicked = false;

  useEffect(() => {
    const handleScroll = () => {
      if (isClicked) return;
      let elements = document.querySelectorAll(`[data-target]`);
      let inViewElements = Array.from(elements).filter((item) => {
        return item.getBoundingClientRect().y < 200;
      });
      window.location.hash =
        inViewElements[inViewElements.length - 1]?.getAttribute(
          "data-target"
        ) || "";
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClicked]);

  const handleActiveItem = (item: any) => {
    window.location.hash = item.id;
    isClicked = true;
    let element: HTMLElement | null = document.querySelector(
      `[data-target=${item.id}]`
    );
    let elementTop = element ? element.offsetTop - 150 : 0;
    window.scrollTo({
      top: elementTop,
    });
  };

  const { mutate } = useMutation(updateTask, {
    onSuccess: (res) => {
      setStaticState(res.data);
      setState(res.data);
      snack.success("Task Details Updated");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleUpdate = () => {
    mutate({
      id: staticState?.id,
      data: state,
    });
  };

  const taskMenu = () => {
    if (staticState?.parentTask) {
      return taskViewMenu.filter((item) => item.id !== "subtasks");
    }
    return taskViewMenu;
  };

  if (isLoading) return <Loader minHeight="60vh" />;

  return (
    <>
      <Box position="sticky" top={55} zIndex={2}>
        <Box
          p={2}
          bgcolor="white"
          display="flex"
          justifyContent="space-between"
        >
          <BreadCrumbs page="taskView" />
          <Button
            onClick={() => setOpen(true)}
            startIcon={<CancelPresentationIcon color="secondary" />}
          >
            Terminate task
          </Button>
        </Box>
        <StyledProfileNav>
          {taskMenu().map((item, index) => (
            <StyledProfileNavItem
              onClick={() => handleActiveItem(item)}
              key={index}
              active={window.location.hash?.replace("#", "") === item.id}
            >
              {item.label}
            </StyledProfileNavItem>
          ))}
        </StyledProfileNav>
      </Box>
      <TaskSection id="details">
        <Details
          state={state}
          staticState={staticState}
          setState={setState}
          handleUpdate={handleUpdate}
        />
      </TaskSection>
      <TaskSection id="dd">
        <DueDiligence />
      </TaskSection>
      <TaskSection id="description">
        <Description
          state={state}
          setState={setState}
          handleUpdate={handleUpdate}
        />
      </TaskSection>
      <TaskSection id="checklists">
        <Checklists />
      </TaskSection>
      <TaskSection id="milestones">
        <Milestones />
      </TaskSection>
      <TaskSection id="comments">
        <Comments />
      </TaskSection>
      <TaskSection id="expenditure">
        <Expenditure />
      </TaskSection>
      {!staticState?.parentTask && (
        <TaskSection id="subtasks">
          <SubTasks task={staticState} />
        </TaskSection>
      )}
      <TaskSection id="attachments">
        <Attachments />
      </TaskSection>
      <TaskSection id="loghours">
        <LogHours task={staticState} />
      </TaskSection>
      <TaskSection id="events">
        <Events task={state} />
      </TaskSection>
      <TerminationDialog open={open} setOpen={setOpen} />
    </>
  );
}

interface Props {
  id: string;
  children: any;
}

const TaskSection = ({
  children,

  id,
}: Props) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  return (
    <StyledTaskSection data-target={id} ref={elementRef}>
      {children}
    </StyledTaskSection>
  );
};

export default TaskDetails;
