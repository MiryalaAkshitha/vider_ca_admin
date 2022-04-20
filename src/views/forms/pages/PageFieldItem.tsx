import { Delete, Edit } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import { deleteField, updatePage } from "api/services/forms";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectForms, setFocused } from "redux/reducers/formsSlice";
import { StyledDraggebleFormField } from "views/taskboard/styles";
import FieldProperties from "../fields/FieldProperties";
import RenderField from "../utils/RenderField";

const PageFieldItem = ({ item, index }: any) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const snack = useSnack();
  const [active, setActive] = useState<boolean>(false);
  const { data, activePage, focused } = useSelector(selectForms);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const { mutate } = useMutation(deleteField, {
    onSuccess: () => {
      snack.success("Field deleted");
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: updatePageFields } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Page fields added");
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this field?",
      action: () => {
        mutate({
          formId: params.formId,
          pageId: data.pages[activePage]?._id,
          fieldId: item._id,
        });
      },
    });
  };

  const handleCloneField = () => {
    let { _id, ...newItem } = item;
    let fields = [...data.pages[activePage]?.fields];
    let index = fields.findIndex((field: any) => field._id === item._id);
    fields.splice(index + 1, 0, newItem);

    updatePageFields({
      formId: params.formId,
      pageId: data.pages[activePage]?._id,
      data: {
        fields,
      },
    });
  };

  const { control } = useForm();

  return (
    <>
      <Draggable draggableId={item?._id} key={item?._id} index={index}>
        {(provided: any, snapshot: any) => (
          <StyledDraggebleFormField
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            draggablestyle={provided.draggableProps.style}
            active={active ? 1 : 0}
            onMouseOver={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            isdragging={snapshot.isDragging ? 1 : 0}
            focused={focused === item?._id ? 1 : 0}
          >
            <div className="field">
              <RenderField item={item} control={control} />
            </div>
            <div className="actions" onMouseOver={(e) => e.stopPropagation()}>
              <IconButton
                sx={{ borderRadius: 0 }}
                onClick={() => {
                  setOpen(true);
                  dispatch(setFocused(item?._id));
                }}
              >
                <Edit color="secondary" fontSize="small" />
              </IconButton>
              <IconButton onClick={handleCloneField} sx={{ borderRadius: 0 }}>
                <ContentCopyIcon color="secondary" fontSize="small" />
              </IconButton>
              <IconButton onClick={handleDelete} sx={{ borderRadius: 0 }}>
                <Delete color="secondary" fontSize="small" />
              </IconButton>
            </div>
          </StyledDraggebleFormField>
        )}
      </Draggable>
      <FieldProperties open={open} setOpen={setOpen} item={item} />
    </>
  );
};

export default PageFieldItem;
