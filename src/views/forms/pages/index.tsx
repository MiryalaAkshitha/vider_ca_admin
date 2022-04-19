import { Add, PlayArrow } from "@mui/icons-material";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useRef } from "react";
import { Droppable } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  selectForms,
  setActivePage,
  setAddPageOpen,
} from "redux/reducers/formsSlice";
import PageFieldItem from "./PageFieldItem";

function Pages() {
  const dispatch = useDispatch();
  const { activePage, data } = useSelector(selectForms);

  const elementRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   if (!elementRef.current) return;

  //   const config = {
  //     childList: true,
  //     subtree: true,
  //   };

  //   let elementScrollHeight = elementRef.current.scrollHeight;

  //   const callback = (mutationList: MutationRecord[]) => {
  //     elementScrollHeight = elementRef!.current!.scrollHeight;

  //     for (const mutation of mutationList) {
  //       if (mutation.type === "childList") {
  //         for (const addedNode of Array.from(mutation.addedNodes)) {
  //           let element = addedNode as HTMLElement;
  //           if (element.getAttribute("data-handler-id")) {
  //             window.scrollTo({
  //               top: elementScrollHeight,
  //               behavior: "smooth",
  //             });
  //           }
  //         }
  //       }
  //     }
  //   };

  //   const observer = new MutationObserver(callback);

  //   observer.observe(elementRef.current, config);
  //   return () => {
  //     observer.disconnect();
  //   };
  // }, []);

  return (
    <Box
      ref={elementRef}
      sx={{
        border: "1px solid #22222226",
        borderRadius: "10px",
        mr: 10,
        mb: 10,
      }}
    >
      <Box textAlign="right" pt={2} pr={1}>
        <Button
          onClick={() => dispatch(setAddPageOpen(true))}
          startIcon={<Add />}
          color="secondary"
        >
          Add Page
        </Button>
        <a
          rel="noopener noreferrer"
          href={`/forms/${data._id}/?preview=true`}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <Button sx={{ ml: 1 }} startIcon={<PlayArrow />} color="secondary">
            Preview
          </Button>
        </a>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={activePage}
          onChange={(e, val) => dispatch(setActivePage(val))}
          aria-label="basic tabs example"
        >
          {data?.pages?.map((item: any, index: number) => (
            <Tab label={item?.name} {...a11yProps(index)} key={item?._id} />
          ))}
        </Tabs>
      </Box>
      <Box>
        <Box
          sx={{
            minHeight: 300,
            "& > div:last-child": {
              borderBottom: "1px solid transparent",
            },
          }}
        >
          <Droppable droppableId="formbuilder-page-fields">
            {(provided: any) => (
              <>
                <Box
                  ref={(ref) => {
                    provided.innerRef(ref);
                  }}
                  sx={{
                    pt: 5,
                    pb: 10,
                  }}
                >
                  {data?.pages[activePage]?.fields?.map(
                    (item: any, index: number) => (
                      <PageFieldItem item={item} key={index} index={index} />
                    )
                  )}
                  {provided.placeholder}
                </Box>
              </>
            )}
          </Droppable>
        </Box>
      </Box>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Pages;
