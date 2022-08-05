import { Menu, MenuItem } from "@mui/material";
import { deleteEvent } from "api/services/events";
import { useConfirm } from "context/ConfirmDialog";
import { snack } from "components/toast";
import { AccountMenuProps } from "layout/primarylayout/AccountMenu";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditLinkEvent from "./EditLinkEvent";
import ViewEvent from "views/calendar/ViewEvent";

interface EditEventProps extends AccountMenuProps {
  event: any;
}

function EditEventPopover(props: EditEventProps) {
  const { anchorEl, setAnchorEl, event } = props;
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
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
        onClick={handleClose}
      >
        <MenuItem onClick={() => setViewOpen(true)}>View</MenuItem>
        <MenuItem onClick={() => setEditOpen(true)}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Remove</MenuItem>
      </Menu>
      <EditLinkEvent open={editOpen} setOpen={setEditOpen} event={event} />
      <ViewEvent
        from="task"
        open={viewOpen}
        setOpen={setViewOpen}
        data={event}
      />
    </>
  );
}

export default EditEventPopover;
