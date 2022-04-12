import { Box } from "@mui/material";
import { updatePage } from "api/services/forms";
import useSnack from "hooks/useSnack";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { reorder } from "views/taskboard/board/utils";
import PageFieldItem from "./PageFieldItem";

type Props = {
  data: any;
};

function PageFields({ data }: Props) {
  const params = useParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [state, setState] = useState<any>({});
  const listContainerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setState(data);
  }, [data]);

  const { mutate } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Fields reordered successfully");
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onDragEnd = async (result: any) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId !== destination.droppableId) return;

    if (source.index === destination.index) return;

    const ordered = reorder(state?.fields, source.index, destination.index);

    setState({
      ...state,
      fields: ordered,
    });

    mutate({
      formId: params.formId,
      pageId: data?._id,
      data: {
        fields: ordered,
      },
    });
  };

  return (
    <Box>
      <DragDropContext onDragEnd={onDragEnd}>
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
              {state?.fields?.map((item: any, index: number) => (
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
      </DragDropContext>
    </Box>
  );
}

export default PageFields;
