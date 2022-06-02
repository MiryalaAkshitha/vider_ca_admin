import TaskDataProvider, { TaskDataContext } from "context/TaskData";
import useTitle from "hooks/useTitle";
import { useEffect, useRef } from "react";
import { StyledTaskSection } from "views/clients/clients/styles";
import Attachments from "views/taskboard/taskview/attachments";
import Checklists from "views/taskboard/taskview/Checklists";
import Comments from "views/taskboard/taskview/comments";
import Description from "views/taskboard/taskview/Description";
import Details from "views/taskboard/taskview/Details";
import IPro from "views/taskboard/taskview/iPro";
import Events from "views/taskboard/taskview/events";
import Expenditure from "views/taskboard/taskview/expenditure";
import LogHours from "views/taskboard/taskview/LogHours";
import Milestones from "views/taskboard/taskview/Milestones";
import SubTasks from "views/taskboard/taskview/Subtasks";
import TaskHeader from "../../views/taskboard/taskview/TaskHeader";
import StageOfWork from "views/taskboard/taskview/StageOfWork";

function TaskDetails() {
  useTitle("Task Details");

  useEffect(() => {
    const handleScroll = () => {
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
  }, []);

  const handleActiveItem = (item: any) => {
    window.location.hash = item.id;
    let element: HTMLElement | null = document.querySelector(
      `[data-target=${item.id}]`
    );
    let elementTop = element ? element.offsetTop - 150 : 0;
    window.scrollTo({
      top: elementTop,
    });
  };

  return (
    <TaskDataProvider>
      <TaskHeader onChange={(v: string) => handleActiveItem(v)} />
      <TaskSection id="details">
        <Details />
      </TaskSection>
      <TaskSection id="iPro">
        <IPro />
      </TaskSection>
      <TaskSection id="description">
        <Description />
      </TaskSection>
      <TaskSection id="checklists">
        <Checklists />
      </TaskSection>
      <TaskSection id="milestones">
        <Milestones />
      </TaskSection>
      <TaskSection id="stageofwork">
        <StageOfWork />
      </TaskSection>
      <TaskSection id="comments">
        <Comments />
      </TaskSection>
      <TaskSection id="expenditure">
        <Expenditure />
      </TaskSection>
      <TaskDataContext.Consumer>
        {(value: any) => {
          if (!value?.parentTask) {
            return (
              <TaskSection id="subtasks">
                <SubTasks />
              </TaskSection>
            );
          }
        }}
      </TaskDataContext.Consumer>
      <TaskSection id="attachments">
        <Attachments />
      </TaskSection>
      <TaskSection id="loghours">
        <LogHours />
      </TaskSection>
      <TaskSection id="events">
        <Events />
      </TaskSection>
    </TaskDataProvider>
  );
}

interface Props {
  id: string;
  children: any;
}

const TaskSection = ({ children, id }: Props) => {
  const elementRef = useRef<HTMLDivElement | null>(null);
  return (
    <StyledTaskSection data-target={id} ref={elementRef}>
      {children}
    </StyledTaskSection>
  );
};

export default TaskDetails;
