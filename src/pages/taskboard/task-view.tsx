import CancelPresentationIcon from "@mui/icons-material/CancelPresentation";
import { Box, Button } from "@mui/material";
import { getTask, updateTask } from "api/services/tasks";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
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
  const [selected, setSelected] = useState<any>("");
  const [open, setOpen] = useState(false);

  const { isLoading }: ResType = useQuery(["task", params.taskId], getTask, {
    onSuccess: (res: any) => {
      setStaticState(res?.data);
      setState(res?.data);
    },
    cacheTime: 0,
  });

  useEffect(() => {
    setSelected("Details");
  }, [params.taskId]);

  const handleActiveItem = (item: string) => {
    setSelected(item);
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
      return taskViewMenu.filter((item) => item !== "Sub Tasks");
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
              active={selected === item}
            >
              {item}
            </StyledProfileNavItem>
          ))}
        </StyledProfileNav>
      </Box>
      <TaskSection selected={selected} setSelected={setSelected} id="Details">
        <Details
          state={state}
          staticState={staticState}
          setState={setState}
          handleUpdate={handleUpdate}
        />
      </TaskSection>
      <TaskSection
        selected={selected}
        setSelected={setSelected}
        id="Due Diligence"
      >
        <DueDiligence />
      </TaskSection>
      <TaskSection
        selected={selected}
        setSelected={setSelected}
        id="Description"
      >
        <Description
          state={state}
          setState={setState}
          handleUpdate={handleUpdate}
        />
      </TaskSection>
      <TaskSection
        selected={selected}
        setSelected={setSelected}
        id="Checklists"
      >
        <Checklists />
      </TaskSection>
      <TaskSection
        selected={selected}
        setSelected={setSelected}
        id="Milestones"
      >
        <Milestones />
      </TaskSection>
      <TaskSection selected={selected} setSelected={setSelected} id="Comments">
        <Comments />
      </TaskSection>
      <TaskSection
        selected={selected}
        setSelected={setSelected}
        id="Expenditure"
      >
        <Expenditure />
      </TaskSection>
      {!staticState?.parentTask && (
        <TaskSection
          selected={selected}
          setSelected={setSelected}
          id="Sub Tasks"
        >
          <SubTasks task={staticState} />
        </TaskSection>
      )}
      <TaskSection
        selected={selected}
        setSelected={setSelected}
        id="Attachments"
      >
        <Attachments />
      </TaskSection>
      <TaskSection selected={selected} setSelected={setSelected} id="Log Hours">
        <LogHours task={staticState} />
      </TaskSection>
      <TaskSection selected={selected} setSelected={setSelected} id="Events">
        <Events task={state} />
      </TaskSection>
      <TerminationDialog open={open} setOpen={setOpen} />
    </>
  );
}

interface Props {
  selected: string;
  id: string;
  children: any;
  setSelected: (item: string) => void;
}

const TaskSection = ({ children, selected, setSelected, id }: Props) => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (selected === id) {
      if (elementRef.current) {
        const elementTop = elementRef.current.offsetTop;
        const top = elementTop - 140;
        window.scrollTo({ top });
      }
    }
  }, [selected, id]);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (elementRef.current) {
  //       let elementTop = elementRef.current.getBoundingClientRect().y;
  //       if (elementTop < 200) {
  //         setSelected(id);
  //       }
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, [id, setSelected]);

  return <StyledTaskSection ref={elementRef}>{children}</StyledTaskSection>;
};

export default TaskDetails;
