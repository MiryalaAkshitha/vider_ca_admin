import { IconButton, Menu, MenuItem } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useConfirm } from "context/ConfirmDialog";
import { snack } from "components/toast";
import { useMutation, useQueryClient } from "react-query";
import { deleteBillingEntity } from "api/services/billingEntity";

const Actions = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const { mutate } = useMutation(deleteBillingEntity, {
    onSuccess: () => {
      snack.success("Billing entity removed");
      setAnchorEl(null);
      queryClient.invalidateQueries("billing-entities");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
      setAnchorEl(null);
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    navigate(`/settings/billing-entities/${data.id}`);
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
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
      >
        <MoreVertOutlinedIcon color="primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};
export default Actions;
