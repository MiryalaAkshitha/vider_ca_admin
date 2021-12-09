import { Box } from "@mui/material";
import BreadCrumbs from "components/BreadCrumbs";
import useTitle from "hooks/useTitle";
import { useEffect, useRef, useState } from "react";
import { taskViewMenu } from "utils/constants";
import {
  StyledProfileNav,
  StyledProfileNavItem,
  StyledTaskSection,
} from "views/clients/styles";
import Attachments from "views/taskboard/taskview/attachments";
import Comments from "views/taskboard/taskview/comments";
import Details from "views/taskboard/taskview/Details";
import SubTasks from "views/taskboard/taskview/Subtasks";

function TaskDetails() {
  useTitle("Task Details");

  const [activeIndex, setActiveIndex] = useState(0);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const elementsRef = useRef<HTMLElement[]>([]);

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

  useEffect(() => {
    const handleScroll = () => {
      elementsRef.current.forEach((element, index) => {
        let elementTop = element.getBoundingClientRect().y;
        let headerHeight = headerRef.current!.offsetHeight;
        if (elementTop < headerHeight + 100) {
          setActiveIndex(index);
        }
      });
    };
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

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
        <Details />
      </StyledTaskSection>
      <StyledTaskSection data-index={1} ref={(ref) => getRef(ref, 1)}>
        <Comments />
      </StyledTaskSection>
      <StyledTaskSection data-index={2} ref={(ref) => getRef(ref, 2)}>
        <SubTasks />
      </StyledTaskSection>
      <StyledTaskSection data-index={3} ref={(ref) => getRef(ref, 3)}>
        <Attachments />
      </StyledTaskSection>
    </>
  );
}

export default TaskDetails;
