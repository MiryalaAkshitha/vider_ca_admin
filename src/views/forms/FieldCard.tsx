import MoreVertRounded from "@mui/icons-material/MoreVertRounded";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteField } from "api/services/forms";
import { useConfirm } from "components/ConfirmDialogProvider";
import CustomCard from "components/CustomCard";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditField from "./EditField";

type Props = {
  data: any;
};

function FieldCard(props: Props) {
  const { data } = props;
  const confirm = useConfirm();
  const snack = useSnack();
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
    confirm({
      msg: "Are you sure you want to delete this field",
      action: () => {
        mutate(data.id);
      },
    });
  };

  return (
    <>
      <CustomCard sx={{ minHeight: 50 }}>
        <Box display="flex" gap={1} justifyContent="space-between">
          <div>
            <Typography variant="subtitle2" color="primary">
              {data?.name}
            </Typography>
          </div>
          <div>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
              <MoreVertRounded />
            </IconButton>
          </div>
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
        <MenuItem onClick={handleDelete}>Remove</MenuItem>
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
      </Menu>
      <EditField open={editOpen} setOpen={setEditOpen} data={data} />
    </>
  );
}

export default FieldCard;
