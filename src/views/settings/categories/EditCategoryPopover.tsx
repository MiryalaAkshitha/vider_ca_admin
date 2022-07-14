import { Menu, MenuItem } from "@mui/material";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "data/permissons";
import { AccountMenuProps } from "layout/primarylayout/AccountMenu";
import { useState } from "react";
import EditCategory from "./EditCategory";

interface EditCategoryPopoverProps extends AccountMenuProps {
  data: any;
}

function EditCategoryPopover(props: EditCategoryPopoverProps) {
  const { anchorEl, setAnchorEl, data } = props;
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const handleEdit = () => {
    setEditOpen(true);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            minWidth: 100,
          },
        }}
      >
        <ValidateAccess name={Permissions.EDIT_CATEGORIES}>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
        </ValidateAccess>
      </Menu>
      <EditCategory open={editOpen} setOpen={setEditOpen} data={data} />
    </>
  );
}

export default EditCategoryPopover;
