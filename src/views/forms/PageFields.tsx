import { Box } from "@mui/material";
import { reorderDDFormFields } from "api/services/tasks";
import useSnack from "hooks/useSnack";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import PageFieldItem from "./PageFieldItem";

type Props = {
  data: any;
  value: number;
};

function PageFields({ data, value }: Props) {
  const queryClient = useQueryClient();
  const snack = useSnack();

  const { mutate } = useMutation(reorderDDFormFields, {
    onSuccess: () => {
      snack.success("Items reordered successfully");
      queryClient.invalidateQueries("dd-forms");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onDragEnd = async (result: any) => {
    // const { source, destination } = result;
    // if (!destination) return;
    // if (source.droppableId === destination.droppableId) {
    //   if (source.index === destination.index) return;
    //   const result = reorder(
    //     data[value]?.dueDiligenceFormFields,
    //     source.index,
    //     destination.index
    //   );
    //   const newData = [...data];
    //   newData[value].dueDiligenceFormFields = result;
    //   setData(newData);
    //   mutate(result?.map((item: any) => item.id));
    //   return;
    // }
  };

  return (
    <Box p={2} maxWidth={600}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="form-fields">
          {(provided: any, snapshot: any) => (
            <Box
              ref={(ref) => {
                provided.innerRef(ref);
              }}
            >
              {data[value]?.fields?.map((item: any, index: number) => (
                <Draggable
                  key={item?._id?.toString()}
                  draggableId={item?._id?.toString()}
                  index={index}
                >
                  {(provided: any, snapshot: any) => (
                    <PageFieldItem
                      provided={provided}
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
