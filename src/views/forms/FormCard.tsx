import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteForm } from "api/forms";
import { useConfirm } from "components/ConfirmDialogProvider";
import CustomCard from "components/CustomCard";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import EditForm from "./EditForm";

function FormCard(props: any) {
  const { data } = props;
  const confirm = useConfirm();
  const snack = useSnack();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const { mutate } = useMutation(deleteForm, {
    onSuccess: () => {
      snack.success("Form Removed");
      setAnchorEl(null);
      queryClient.invalidateQueries("forms");
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
    confirm({
      msg: "Are you sure you want to delete this form",
      action: () => {
        mutate(data.id);
      },
    });
  };

  return (
    <>
      <CustomCard sx={{ minHeight: 120 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle2" color="primary">
            {data?.name}
          </Typography>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVertRounded />
          </IconButton>
        </Box>
        <Box display="flex" gap={2} mt={1}>
          {data?.tags?.map((item, index) => (
            <Box
              px="10px"
              py="1px"
              minWidth={80}
              textAlign="center"
              borderRadius={2}
              key={index}
              border="1px solid rgb(24, 47, 83, 0.2)"
            >
              <Typography color="primary" variant="caption">
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      </CustomCard>
      <Menu
        id="long-menu"
        PaperProps={{
          sx: { minWidth: 120 },
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => navigate(`/settings/forms/${data?.id}/fields`)}
        >
          Fields
        </MenuItem>
        <MenuItem onClick={handleDelete}>Remove</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
      <EditForm open={editOpen} setOpen={setEditOpen} data={data} />
    </>
  );
}

export default FormCard;
