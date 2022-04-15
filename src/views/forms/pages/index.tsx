import { Add, PlayArrow } from "@mui/icons-material";
import { Box, Button, Tab, Tabs } from "@mui/material";
import { useRef } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import PageFieldItem from "./PageFieldItem";

function Pages({ data, setPageOpen, value, setValue }: any) {
  const listContainerRef = useRef<HTMLElement | null>(null);

  return (
    <Box
      sx={{
        border: "1px solid #22222226",
        borderRadius: "10px",
        mr: 10,
      }}
    >
      <Box textAlign="right" pt={2} pr={1}>
        <Button
          onClick={() => setPageOpen(true)}
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
          value={value}
          onChange={(e, val) => setValue(val)}
          aria-label="basic tabs example"
        >
          {data?.pages?.map((item: any, index: number) => (
            <Tab label={item?.name} {...a11yProps(index)} key={item?.id} />
          ))}
        </Tabs>
      </Box>
      <Box>
        <Droppable droppableId="page-form-fields">
          {(provided: any, snapshot: any) => (
            <Box
              ref={(ref: any) => {
                listContainerRef.current = ref;
                provided.innerRef(ref);
              }}
              sx={{
                "& > div:last-child": {
                  borderBottom: "1px solid transparent",
                },
              }}
            >
              {data?.pages[value]?.fields?.map((item: any, index: number) => (
                <Draggable
                  key={item?._id?.toString()}
                  draggableId={item?._id?.toString()}
                  index={index}
                >
                  {(provided: any, snapshot: any) => (
                    <PageFieldItem
                      provided={provided}
                      page={data}
                      snapshot={snapshot}
                      item={item}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
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
