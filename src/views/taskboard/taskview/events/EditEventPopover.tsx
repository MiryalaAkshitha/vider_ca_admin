import { Menu, MenuItem } from "@mui/material";
import { deleteEvent } from "api/services/events";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { AccountMenuProps } from "layout/primarylayout/AccountMenu";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditEvent from "./EditEvent";

interface EditEventProps extends AccountMenuProps {
  event: any;
}

function EditEventPopover(props: EditEventProps) {
  const { anchorEl, setAnchorEl, event } = props;
  const snack = useSnack();
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const { mutate } = useMutation(deleteEvent, {
    onSuccess: () => {
      snack.success("Event deleted.");
      setAnchorEl(null);
      queryClient.invalidateQueries("events");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
      setAnchorEl(null);
    },
  });

  const handleEdit = () => {
    setEditOpen(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    setAnchorEl(null);
    confirm({
      msg: "Are you sure you want to delete this event?",
      action: () => {
        mutate({ id: event.id });
      },
    });
  };

  return (
    <>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Remove</MenuItem>
      </Menu>
      <EditEvent open={editOpen} setOpen={setEditOpen} event={event} />
    </>
  );
}

export default EditEventPopover;
