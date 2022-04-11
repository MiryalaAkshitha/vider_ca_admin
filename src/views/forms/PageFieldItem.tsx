import { Delete, Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { deleteDDFormField } from "api/services/tasks";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { StyledDraggebleFormField } from "views/taskboard/styles";
import RenderField from "./RenderField";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const PageFieldItem = ({ provided, snapshot, item }: any) => {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const snack = useSnack();
  const [open, setOpen] = useState<boolean>(false);
  const [active, setActive] = useState<boolean>(false);

  const { mutate } = useMutation(deleteDDFormField, {
    onSuccess: () => {
      snack.success("Field deleted successfully");
      queryClient.invalidateQueries("dd-forms");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this field?",
      action: () => {
        mutate(item.id);
      },
    });
  };

  return (
    <>
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
          <RenderField item={item} />
        </div>
        <div className="actions">
          <IconButton onClick={() => setOpen(true)} sx={{ borderRadius: 0 }}>
            <Edit color="secondary" fontSize="small" />
          </IconButton>
          <IconButton onClick={handleDelete} sx={{ borderRadius: 0 }}>
            <ContentCopyIcon color="secondary" fontSize="small" />
          </IconButton>
          <IconButton onClick={handleDelete} sx={{ borderRadius: 0 }}>
            <Delete color="secondary" fontSize="small" />
          </IconButton>
        </div>
      </StyledDraggebleFormField>
    </>
  );
};

export default PageFieldItem;
