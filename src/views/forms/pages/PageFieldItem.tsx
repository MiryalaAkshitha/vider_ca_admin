import { Delete, Edit } from "@mui/icons-material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/material";
import { deleteField, updatePage } from "api/services/forms";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  moveFields,
  selectForms,
  setTodoIndex,
} from "redux/reducers/formsSlice";
import { StyledDraggebleFormField } from "views/taskboard/styles";
import CreateField from "../fields/CreateField";
import { ItemTypes } from "../utils/itemTypes";
import RenderField from "../utils/RenderField";

const PageFieldItem = ({ item, index }: any) => {
  const params = useParams();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const snack = useSnack();
  const [active, setActive] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { data, activePage } = useSelector(selectForms);
  const [open, setOpen] = useState(false);

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

      if (item.type === "outside") {
        dispatch(setTodoIndex(hoverIndex));
        return;
      }

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 1.5;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      dispatch(
        moveFields({
          from: dragIndex,
          to: hoverIndex,
        })
      );

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.BOX,
    item: () => {
      return { data: item, type: "inside", index };
    },
    end: (item, monitor) => {
      updatePageFields({
        formId: params.formId,
        pageId: data.pages[activePage]?._id,
        data: {
          fields: data.pages[activePage].fields,
        },
      });
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  const { control } = useForm();

  return (
    <>
      <StyledDraggebleFormField
        data-handler-id={handlerId}
        ref={ref}
        active={active ? 1 : 0}
        onMouseOver={() => setActive(true)}
        onMouseLeave={() => setActive(false)}
        isdragging={isDragging ? 1 : 0}
        focused={0}
      >
        <div className="field">
          <RenderField item={item} control={control} />
        </div>
        <div className="actions" onMouseOver={(e) => e.stopPropagation()}>
          <IconButton
            sx={{ borderRadius: 0 }}
            onClick={() => {
              setOpen(true);
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
      <CreateField open={open} setOpen={setOpen} item={item} />
    </>
  );
};

export default PageFieldItem;
