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
import { ItemTypes } from "../utils/itemTypes";
import RenderField from "../utils/RenderField";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";

const PageFieldItem = ({ item, page, index }: any) => {
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

  const ref: any = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: ItemTypes.BOX,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor: any) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      console.log(dragIndex, hoverIndex);

      // Time to actually perform the action
      // moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: () => {
      return { id: item?._id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const { control } = useForm();

  return (
    <StyledDraggebleFormField
      ata-handler-id={handlerId}
      ref={ref}
      active={active ? 1 : 0}
      onMouseOver={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      isdragging={0}
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
