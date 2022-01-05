import { Box } from "@mui/material";
import { reorderDDFormFields } from "api/services/tasks";
import useSnack from "hooks/useSnack";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import { renderField } from "views/clients/ClientInfo/renderField";
import { reorder } from "views/taskboard/board/utils";
import { StyledDraggebleFormField } from "views/taskboard/styles";

type Props = {
  data: any;
  value: number;
  setData: (data: any) => void;
};

function FormFields({ data, value, setData }: Props) {
  const queryClient = useQueryClient();
  const snack = useSnack();
  const onChange = (field: any, e: any) => {};

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
                      <StyledDraggebleFormField
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        draggablestyle={provided.draggableProps.style}
                        isdragging={snapshot.isDragging?.toString()}
                      >
                        {renderField(item, (e: any) => onChange(item, e))}
                      </StyledDraggebleFormField>
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
