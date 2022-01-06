import { Box } from "@mui/material";
import { reorderDDFormFields } from "api/services/tasks";
import useSnack from "hooks/useSnack";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import { reorder } from "views/taskboard/board/utils";
import FormFieldItem from "./FormFieldItem";

type Props = {
  data: any;
  value: number;
  setData: (data: any) => void;
};

function FormFields({ data, value, setData }: Props) {
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
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      if (source.index === destination.index) return;
      const result = reorder(
        data[value]?.dueDiligenceFormFields,
        source.index,
        destination.index
      );
      const newData = [...data];
      newData[value].dueDiligenceFormFields = result;
      setData(newData);
      mutate(result?.map((item: any) => item.id));
      return;
    }
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
              {data[value]?.dueDiligenceFormFields?.map(
                (item: any, index: number) => (
                  <Draggable
                    key={item?.id?.toString()}
                    draggableId={item?.id?.toString()}
                    index={index}
                  >
                    {(provided: any, snapshot: any) => (
                      <FormFieldItem
                        provided={provided}
                        snapshot={snapshot}
                        item={item}
                      />
                    )}
                  </Draggable>
                )
              )}
              {provided.placeholder}
            </Box>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}

export default FormFields;
