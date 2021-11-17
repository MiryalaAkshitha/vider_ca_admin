import loadable from "@loadable/component";
import { Box } from "@mui/material";
import BreadCrumbs from "components/BreadCrumbs";
import useTitle from "hooks/useTitle";
import { useEffect, useRef, useState } from "react";
import { taskViewMenu } from "utils/constants";
import { ProfileNav, ProfileNavItem } from "views/clients/styles";
const Details = loadable(() => import("views/taskboard/taskview/Details"));
const Comments = loadable(() => import("views/taskboard/taskview/comments"));
const SubTasks = loadable(() => import("views/taskboard/taskview/SubTasks"));
const Attachments = loadable(
  () => import("views/taskboard/taskview/Attachments")
);

function TaskDetails() {
  useTitle("Task Details");

  const headerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
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
        <ProfileNav>
          {taskViewMenu.map((item, index) => (
            <ProfileNavItem
              onClick={() => handleActiveItem(index)}
              key={index}
              active={index === activeIndex}
            >
              {item}
            </ProfileNavItem>
          ))}
        </ProfileNav>
      </Box>
      <Box
        sx={{
          borderBottom: "4px solid rgba(0,0,0,0.05)",
          pb: 5,
        }}
        data-index={0}
        ref={(ref) => getRef(ref, 0)}
      >
        <Details />
      </Box>
      <Box
        sx={{
          borderBottom: "4px solid rgba(0,0,0,0.05)",
          pb: 5,
        }}
        data-index={1}
        ref={(ref) => getRef(ref, 1)}
      >
        <Comments />
      </Box>
      <Box
        sx={{
          borderBottom: "4px solid rgba(0,0,0,0.05)",
          pb: 5,
        }}
        data-index={2}
        ref={(ref) => getRef(ref, 2)}
      >
        <SubTasks />
      </Box>
      <Box
        sx={{
          borderBottom: "4px solid rgba(0,0,0,0.05)",
          pb: 5,
        }}
        data-index={3}
        ref={(ref) => getRef(ref, 3)}
      >
        <Attachments />
      </Box>
    </>
  );
}

export default TaskDetails;
