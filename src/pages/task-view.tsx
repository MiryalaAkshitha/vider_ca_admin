import { Box } from "@mui/material";
import { getTask, updateTask } from "api/services/tasks";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
import { useRef, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResponseType } from "types";
import { taskViewMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem,
  StyledTaskSection,
} from "views/clients/styles";
import Attachments from "views/taskboard/taskview/attachments";
import Comments from "views/taskboard/taskview/comments";
import Description from "views/taskboard/taskview/Description";
import Details from "views/taskboard/taskview/Details";
import LogHours from "views/taskboard/taskview/LogHours";
import SubTasks from "views/taskboard/taskview/Subtasks";

function TaskDetails() {
  useTitle("Task Details");
  const snack = useSnack();
  const params: any = useParams();
  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const elementsRef = useRef<HTMLElement[]>([]);
  const [state, setState] = useState<any>({});

  const { isLoading }: ResponseType = useQuery(
    ["task", params.taskId],
    getTask,
    {
      onSuccess: (res: any) => {
        setState(res?.data);
      },
    }
  );

  const getRef = (ref: any, index: number) => {
    elementsRef.current[index] = ref as HTMLElement;
  };

  const handleActiveItem = (index: number) => {
    setActiveIndex(index);
    let elementTop = elementsRef.current[index].offsetTop;
    let headerHeight = headerRef.current!.offsetHeight;
    let top = elementTop - headerHeight - 20;
    window.scrollTo({ top });
  };

  const { mutate } = useMutation(updateTask, {
    onSuccess: () => {
      snack.success("Task Details Updated");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleUpdate = () => {
    mutate({
      id: state?.id,
      data: state,
    });
  };

  if (isLoading) return <Loader minHeight="60vh" />;

  return (
    <>
      <Box position="sticky" top={0} zIndex={2} ref={headerRef}>
        <Box p={2} bgcolor="white">
          <BreadCrumbs page="taskView" />
        </Box>
        <StyledProfileNav>
          {taskViewMenu.map((item, index) => (
            <StyledProfileNavItem
              onClick={() => handleActiveItem(index)}
              key={index}
              active={index === activeIndex}
            >
              {item}
            </StyledProfileNavItem>
          ))}
        </StyledProfileNav>
      </Box>
      <StyledTaskSection data-index={0} ref={(ref) => getRef(ref, 0)}>
        <Details
          state={state}
          setState={setState}
          handleUpdate={handleUpdate}
        />
      </StyledTaskSection>
      <StyledTaskSection data-index={0} ref={(ref) => getRef(ref, 1)}>
        <Description
          state={state}
          setState={setState}
          handleUpdate={handleUpdate}
        />
      </StyledTaskSection>
      <StyledTaskSection data-index={1} ref={(ref) => getRef(ref, 2)}>
        <Comments />
      </StyledTaskSection>
      <StyledTaskSection data-index={2} ref={(ref) => getRef(ref, 3)}>
        <SubTasks />
      </StyledTaskSection>
      <StyledTaskSection data-index={3} ref={(ref) => getRef(ref, 4)}>
        <Attachments />
      </StyledTaskSection>
      <StyledTaskSection data-index={3} ref={(ref) => getRef(ref, 5)}>
        <LogHours />
      </StyledTaskSection>
    </>
  );
}

export default TaskDetails;
