import { Menu, MenuItem } from "@mui/material";
import { deleteTeam } from "api/services/users";
import { useConfirm } from "context/ConfirmDialog";
import { snack } from "components/toast";
import { AccountMenuProps } from "layout/primarylayout/AccountMenu";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditTeam from "./EditTeam";

interface EditTeamPopoverProps extends AccountMenuProps {
  data: any;
}

function EditTeamPopover(props: EditTeamPopoverProps) {
  const { anchorEl, setAnchorEl, data } = props;

  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const { mutate } = useMutation(deleteTeam, {
    onSuccess: () => {
      snack.success("Team Removed");
      setAnchorEl(null);
      queryClient.invalidateQueries("teams");
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

  const handleDelete = () => {
    setAnchorEl(null);
    confirm({
      msg: "Are you sure you want to delete this team?",
      action: () => {
        mutate({ id: data.id });
      },
    });
  };

  return (
    <>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Remove</MenuItem>
      </Menu>
      <EditTeam open={editOpen} setOpen={setEditOpen} selectedTeam={data} />
    </>
  );
}

export default EditTeamPopover;
