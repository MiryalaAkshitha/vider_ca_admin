import { Box, Typography } from "@mui/material";
import { addField, updatePage } from "api/services/forms";
import useSnack from "hooks/useSnack";
import { useEffect, useState } from "react";
import { useDrag } from "react-dnd";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectForms, setFocused } from "redux/reducers/formsSlice";
import { StyledField } from "../styles";
import { ItemTypes } from "../utils/itemTypes";
import { prepareField } from "../utils/prepareField";

function Field({ item }: any) {
  const params = useParams();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const { data, activePage, todoIndex } = useSelector(selectForms);
  const [prevState, setPrevState] = useState(0);
  const [state, setState] = useState(0);
  const dispatch = useDispatch();

  const { mutate: updatePageFields } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Page fields added");
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: handleAddField } = useMutation(addField, {
    onSuccess: () => {
      snack.success("Field added");
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  useEffect(() => {
    if (state === prevState) return;
    setPrevState(state);
    if (todoIndex === null && data?.pages[activePage]?.fields?.length) return;

    let newField = prepareField(item);

    const fields = [...data.pages[activePage].fields];
    fields.splice(todoIndex as any, 0, newField);

    dispatch(setFocused(todoIndex));

    updatePageFields({
      formId: params.formId,
      pageId: data.pages[activePage]?._id,
      data: {
        fields,
      },
    });
  }, [
    state,
    todoIndex,
    data,
    activePage,
    params.formId,
    updatePageFields,
    item,
    prevState,
    dispatch,
  ]);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { data: item, type: "outside" },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (!dropResult) return;
      console.log(dropResult);
      setState(state + 1);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      handlerId: monitor.getHandlerId(),
    }),
  }));

  return (
    <StyledField
      isDragging={isDragging ? 1 : 0}
      ref={drag}
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
  );
}

export default Field;
