import { Add, PlayArrow } from "@mui/icons-material";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
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

  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) {
      if (!elementRef.current) return;

      // let elementScrollHeight = elementRef.current.scrollHeight;

      // window.scrollTo({
      //   top: elementScrollHeight,
      //   behavior: "smooth",
      // });
    }
    didMountRef.current = true;
  }, [data]);

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
            minHeight: 500,
            "& > div:last-child": {
              borderBottom: "1px solid transparent",
            },
          }}
        >
          <Droppable droppableId="formbuilder-page-fields">
            {(provided: any, snapshot: any) => (
              <>
                <Box
                  ref={(ref) => {
                    provided.innerRef(ref);
                  }}
                  sx={{
                    pt: 5,
                    pb: 10,
                    "& > div:first-of-type": {
                      borderTop: "1px solid #22222226",
                    },
                  }}
                >
                  {data?.pages[activePage]?.fields?.map(
                    (item: any, index: number) => (
                      <PageFieldItem
                        item={item}
                        key={item?._id}
                        index={index}
                      />
                    )
                  )}
                  {provided.placeholder}
                  {data?.pages[activePage]?.fields?.length === 0 &&
                    !snapshot?.isDraggingOver && (
                      <Box
                        sx={{
                          p: 2,
                          textAlign: "center",
                          background: "rgba(0,0,0,0.04)",
                          border: "1px dashed rgba(0,0,0,0.1)",
                          width: "70%",
                          margin: "0 auto",
                        }}
                      >
                        <Typography variant="subtitle2" gutterBottom>
                          Start creating
                        </Typography>
                        <Typography variant="body1" color="rgba(0,0,0,0.5)">
                          Drag and drop fields from the right panel to add them
                          to your form.
                        </Typography>
                      </Box>
                    )}
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
