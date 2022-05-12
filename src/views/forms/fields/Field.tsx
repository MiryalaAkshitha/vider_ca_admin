import { Box, Typography } from "@mui/material";
import { addField } from "api/services/forms";
import { snack } from "components/toast";
import { Draggable } from "react-beautiful-dnd";
import { useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectForms } from "redux/reducers/formsSlice";
import { DummyStyledField, StyledField } from "../styles";
import { prepareField } from "../utils/prepareField";

function Field({ item, index }: any) {
  const params = useParams();
  const queryClient = useQueryClient();

  const { data, activePage } = useSelector(selectForms);

  const { mutate: handleAddField } = useMutation(addField, {
    onSuccess: () => {
      snack.success("Field added");
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  return (
    <Draggable draggableId={item?.id} key={item?.id} index={index}>
      {(provided: any, snapshot: any) => (
        <>
          {snapshot.isDragging && (
            <DummyStyledField>
              <Box>
                <img src={item.icon} alt={item.label} width={20} height={20} />
              </Box>
              <Typography variant="caption">{item.label}</Typography>
            </DummyStyledField>
          )}
          <StyledField
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            isdragging={snapshot.isDragging ? 1 : 0}
            style={provided.draggableProps.style}
            onClick={() =>
              handleAddField({
                formId: params.formId,
                pageId: data.pages[activePage]?._id,
                data: prepareField(item),
              })
            }
          >
            <Box>
              <img src={item.icon} alt={item.label} width={20} height={20} />
            </Box>
            <Typography variant="caption">{item.label}</Typography>
          </StyledField>
        </>
      )}
    </Draggable>
  );
}

export default Field;
