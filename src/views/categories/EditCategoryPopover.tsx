import { Menu, MenuItem } from "@mui/material";
import { deleteCategory } from "api/categories";
import useSnack from "hooks/useSnack";
import { AccountMenuProps } from "layout/AccountMenu";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { Category } from "./CategoryCard";
import EditCategory from "./EditCategory";

interface EditCategoryPopoverProps extends AccountMenuProps {
  data: Category;
}

function EditCategoryPopover(props: EditCategoryPopoverProps) {
  const { anchorEl, setAnchorEl, data } = props;
  const open = Boolean(anchorEl);
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState<boolean>(false);

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
    mutate(data.id);
  };

  return (
    <>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Remove</MenuItem>
      </Menu>
      <EditCategory open={editOpen} setOpen={setEditOpen} data={data} />
    </>
  );
}

export default EditCategoryPopover;
