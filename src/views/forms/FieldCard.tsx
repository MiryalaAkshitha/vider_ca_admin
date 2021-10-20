import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteField, deleteForm } from "api/forms";
import CustomCard from "components/CustomCard";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useHistory } from "react-router";
import EditField from "./EditField";
import EditForm from "./EditForm";

function FieldCard(props: any) {
  const { data } = props;
  const snack = useSnack();
  const router = useHistory();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate } = useMutation(deleteField, {
    onSuccess: () => {
      snack.success("Field Removed");
      setAnchorEl(null);
      queryClient.invalidateQueries("fields");
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
      <CustomCard sx={{ minHeight: 50 }}>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle2' color='primary'>
            {data?.name}
          </Typography>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertRounded />
          </IconButton>
        </Box>
      </CustomCard>
      <Menu
        id='long-menu'
        PaperProps={{
          sx: { minWidth: 120 },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        <MenuItem onClick={handleDelete}>Remove</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
      <EditField open={editOpen} setOpen={setEditOpen} data={{}} />
    </>
  );
}

export default FieldCard;
