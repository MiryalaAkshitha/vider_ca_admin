import TaskDataProvider, { TaskDataContext } from "context/TaskData";
import useTitle from "hooks/useTitle";
import { useEffect, useRef } from "react";
import { StyledTaskSection } from "views/clients/styles";
import Attachments from "views/taskview/attachments";
import Checklists from "views/taskview/Checklists";
import Comments from "views/taskview/comments";
import Description from "views/taskview/Description";
import Details from "views/taskview/Details";
import Events from "views/taskview/events";
import Expenditure from "views/taskview/expenditure";
import IPro from "views/taskview/iPro";
import LogHours from "views/taskview/LogHours";
import Milestones from "views/taskview/Milestones";
import StageOfWork from "views/taskview/StageOfWork";
import SubTasks from "views/taskview/Subtasks";
import TaskHeader from "views/taskview/TaskHeader";

function TaskDetails() {
  useTitle("Task Details");

  useEffect(() => {
    window.location.hash = "#details";
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
