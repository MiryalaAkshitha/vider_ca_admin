import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { reorderTasks, updateStatus } from "api/services/tasks/tasks";
import { snack } from "components/toast";
import { TaskStatus } from "data/constants";
import useTitle from "hooks/useTitle";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import { getTitle } from "utils";
import { StyledDraggableItem, StyledDraggableList } from "../styles";
import AddRemarks from "./AddRemarks";
import TaskItem from "./TaskItem";
import { colors, move, reorder } from "./utils";
import { http } from "api/http";

type Props = {
  data: any;
};

interface IState {
  [key: string]: any[];
}

const initialState = {
  [TaskStatus.TODO]: [],
  [TaskStatus.IN_PROGRESS]: [],
  [TaskStatus.ON_HOLD]: [],
  [TaskStatus.UNDER_REVIEW]: [],
  [TaskStatus.DONE]: [],
};

function Board({ data }: Props) {
  const queryClient = useQueryClient();
  const listContainerRef = useRef<HTMLElement | null>(null);
  const [state, setState] = useState<IState>(initialState);
  const [openRemarks, setOpenRemarks] = useState<boolean>(false);
  const [remarksPromise, setRemarksPromise] = useState<Function[]>([]);
  const [onHoldTaskId, setOnHoldTaskId] = useState<number | null>(null);

  const { mutateAsync: reorderItems } = useMutation(reorderTasks, {
    onSuccess: () => {
      snack.success("Items reordered successfully");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutateAsync: updateTaskStatus } = useMutation(updateStatus, {
    onSuccess: () => {
      snack.success("Status has been updated successfully");
      queryClient.invalidateQueries("tasks");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  useEffect(() => {
    const getTasks = (status: TaskStatus) => {
      const result = data
        ?.filter((item: any) => item.status === status)
        ?.sort((a: any, b: any) => a.order - b.order);
      return result;
    };

    const todo = getTasks(TaskStatus.TODO);
    const inProgress = getTasks(TaskStatus.IN_PROGRESS);
    const onHold = getTasks(TaskStatus.ON_HOLD);
    const underReview = getTasks(TaskStatus.UNDER_REVIEW);
    const done = getTasks(TaskStatus.DONE);

    setState({
      [TaskStatus.TODO]: todo,
      [TaskStatus.IN_PROGRESS]: inProgress,
      [TaskStatus.ON_HOLD]: onHold,
      [TaskStatus.UNDER_REVIEW]: underReview,
      [TaskStatus.DONE]: done,
    });
  }, [data]);

  const handleRemarks = () => {
    return new Promise((resolve, reject) => {
      setOpenRemarks(true);
      setRemarksPromise([resolve, reject]);
    });
  };

  const handleUpdateTaskStatus = async (source: any, destination: any) => {
    const prevState = state;
    const sourceId = source.droppableId;
    const destinationId = destination.droppableId;
    try {
      const result: any = move(state[sourceId], state[destinationId], source, destination);
      const sourceItem = state[sourceId][source.index];
      const sourceItemsOrder = result[sourceId].map((item: any) => item.id);
      const destinationItemsOrder = result[destinationId].map((item: any) => item.id);
      setState({ ...state, ...result });

      if (destinationId === TaskStatus.ON_HOLD) {
        setOnHoldTaskId(sourceItem.id);
        await handleRemarks();
      }

      await updateTaskStatus({
        id: sourceItem.id,
        status: destinationId,
        sourceItemsOrder,
        destinationItemsOrder,
      });
    } catch (err) {
      setState(prevState);
    }
  };

  const handleReorderItems = async (source: any, destination: any) => {
    const prevState = state;
    let sourceId = source.droppableId;
    try {
      const result = reorder(state[sourceId], source.index, destination.index);
      const itemsOrder = result.map((item: any) => item.id);
      setState({
        ...state,
        [sourceId]: result,
      });
      await reorderItems(itemsOrder);
    } catch (err) {
      setState(prevState);
    }
  };

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) return;
      handleReorderItems(source, destination);
      return;
    }

    handleUpdateTaskStatus(source, destination);
  };

  useTitle("Task Board");

  return (
    <>
      <Box mt={2} display="flex" gap={20}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Grid spacing={1} container flexWrap="nowrap" justifyContent="space-between">
            {Object.keys(state).map((key, index) => (
              <Grid item style={{ width: "100%" }} key={index}>
                <Box
                  sx={{ display: "inline-flex" }}
                  bgcolor={colors[index]}
                  px={2}
                  py="4px"
                  borderRadius={20}
                >
                  <Typography variant="body2" color="white">
                    {getTitle(key)} ({state[key].length})
                  </Typography>
                </Box>
                <Droppable droppableId={key}>
                  {(provided: any, snapshot: any) => (
                    <StyledDraggableList
                      ref={(ref) => {
                        listContainerRef.current = ref;
                        provided.innerRef(ref);
                      }}
                      height="64vh"
                      isdraggingover={snapshot.isDraggingOver?.toString()}
                    >
                      {state[key].map((item: any, index: number) => (
                        <Draggable
                          key={item?.taskNumber}
                          draggableId={item?.taskNumber}
                          index={index}
                        >
                          {(provided: any, snapshot: any) => (
                            <StyledDraggableItem
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              draggablestyle={provided.draggableProps.style}
                              isdragging={snapshot.isDragging?.toString()}
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
              </Grid>
            ))}
          </Grid>
        </DragDropContext>
      </Box>
      <AddRemarks
        onHoldTaskId={onHoldTaskId}
        remarksPromise={remarksPromise}
        open={openRemarks}
        setOpen={setOpenRemarks}
      />
    </>
  );
}

export default Board;
