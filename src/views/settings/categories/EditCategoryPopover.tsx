import { snack } from "components/toast";
import { Menu, MenuItem } from "@mui/material";
import { deleteCategory } from "api/services/categories";
import { AccountMenuProps } from "layout/primarylayout/AccountMenu";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Category } from "./CategoryCard";
import EditCategory from "./EditCategory";
import { useConfirm } from "context/ConfirmDialog";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "utils/permissons";

interface EditCategoryPopoverProps extends AccountMenuProps {
  data: Category;
}

function EditCategoryPopover(props: EditCategoryPopoverProps) {
  const { anchorEl, setAnchorEl, data } = props;
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const open = Boolean(anchorEl);

  const { mutate } = useMutation(deleteCategory, {
    onSuccess: () => {
      snack.success("Category Removed");
      setAnchorEl(null);
      queryClient.invalidateQueries("categories");
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
      msg: "Are you sure you want to delete this category?",
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
        {/* <ValidateAccess name={Permissions.DELETE_CATEGORIES}>
          <MenuItem onClick={handleDelete}>Remove</MenuItem>
        </ValidateAccess> */}
      </Menu>
      <EditCategory open={editOpen} setOpen={setEditOpen} data={data} />
    </>
  );
}

export default EditCategoryPopover;
