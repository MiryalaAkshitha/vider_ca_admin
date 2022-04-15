import { Delete, Edit } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import { deleteField, updatePage } from "api/services/forms";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { StyledDraggebleFormField } from "views/taskboard/styles";
import RenderField from "../utils/RenderField";

const PageFieldItem = ({ provided, snapshot, item, page }: any) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const snack = useSnack();
  const [active, setActive] = useState<boolean>(false);

  const { mutate } = useMutation(deleteField, {
    onSuccess: () => {
      snack.success("Field deleted");
      queryClient.invalidateQueries("form-details");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: cloneField } = useMutation(updatePage, {
    onSuccess: () => {
      snack.success("Field added");
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
          pageId: page?._id,
          fieldId: item._id,
        });
      },
    });
  };

  const handleCloneField = () => {
    let { _id, ...newItem } = item;
    let fields = [...page?.fields];
    let index = fields.findIndex((field: any) => field._id === item._id);
    fields.splice(index + 1, 0, newItem);

    cloneField({
      formId: params.formId,
      pageId: page?._id,
      data: {
        fields,
      },
    });
  };

  const { control } = useForm();

  return (
    <StyledDraggebleFormField
      active={active ? 1 : 0}
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      isdragging={snapshot.isDragging ? 1 : 0}
      draggablestyle={provided.draggableProps.style}
    >
      <div className="field">
        <RenderField item={item} control={control} />
      </div>
      <div className="actions">
        <IconButton sx={{ borderRadius: 0 }}>
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
  );
};

export default PageFieldItem;
