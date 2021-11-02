import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useTitle from "hooks/useTitle";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { StyledDraggableItem, StyledDraggableList } from "../styled";
import TaskItem from "./TaskItem";
import { colors, getContainerHeight, move, reorder } from "./utils";

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  ON_HOLD = "on_hold",
  UNDER_REVIEW = "under_review",
  DONE = "done",
}

const initialState = {
  "To do": [],
  "In Progress": [],
  "On Hold": [],
  "Under Review": [],
  Done: [],
};

function Board({ data }: any) {
  const [state, setState] = useState(initialState);
  const listContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const getTasks = (status: TaskStatus) => {
      let result = data
        ?.filter((item: any) => item.status === status)
        ?.sort((a: any, b: any) => a.order - b.order);
      return result;
    };

    let todo = getTasks(TaskStatus.TODO);
    let inProgress = getTasks(TaskStatus.IN_PROGRESS);
    let onHold = getTasks(TaskStatus.ON_HOLD);
    let underReview = getTasks(TaskStatus.UNDER_REVIEW);
    let done = getTasks(TaskStatus.DONE);

    setState({
      "To do": todo,
      "In Progress": inProgress,
      "On Hold": onHold,
      "Under Review": underReview,
      Done: done,
    });
  }, [data]);

  const onDragEnd = (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const result = reorder(
        state[source.droppableId],
        source.index,
        destination.index
      );
      setState({
        ...state,
        [source.droppableId]: result,
      });
    } else {
      const result = move(
        state[source.droppableId],
        state[destination.droppableId],
        source,
        destination
      );
      setState({
        ...state,
        ...result,
      });
    }
  };

  useTitle("Task Board");

  return (
    <Box display="flex" gap={20}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid
          spacing={1}
          container
          flexWrap="nowrap"
          justifyContent="space-between"
        >
          {Object.keys(state).map((key, index) => (
            <Grid item style={{ width: "100%" }} key={index}>
              <Box
                sx={{
                  display: "flex",
                  padding: "10px",
                }}
              >
                <Box bgcolor={colors[index]} px={2} py="4px" borderRadius={20}>
                  <Typography variant="body2" color="white">
                    {key}
                  </Typography>
                </Box>
              </Box>
              <Box
                ref={listContainerRef}
                sx={{
                  marginTop: "24px",
                  overflowY: "auto",
                  height: getContainerHeight(listContainerRef?.current),
                }}
              >
                <Droppable droppableId={key}>
                  {(provided, snapshot) => (
                    <StyledDraggableList
                      ref={provided.innerRef}
                      isDraggingOver={snapshot.isDraggingOver}
                    >
                      {state[key].map((item, index) => (
                        <Draggable
                          key={item?.uid}
                          draggableId={item?.uid}
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <StyledDraggableItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              draggableStyle={provided.draggableProps.style}
                              isDragging={snapshot.isDragging}
                            >
                              <TaskItem data={item} />
                            </StyledDraggableItem>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </StyledDraggableList>
                  )}
                </Droppable>
              </Box>
            </Grid>
          ))}
        </Grid>
      </DragDropContext>
    </Box>
  );
}

export default Board;
