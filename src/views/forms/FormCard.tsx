import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Menu, MenuItem, Typography } from "@mui/material";
import { deleteForm } from "api/services/forms";
import { clientFormCard } from "assets";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { StyledCard, StyledMoreIcon } from "./styles";

const FormCard = ({ data }: any) => {
  const snack = useSnack();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteForm, {
    onSuccess: () => {
      setAnchorEl(null);
      queryClient.invalidateQueries("forms");
      snack.success("Form deleted");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this form validation?",
      action: () => {
        mutate({
          id: data.id,
        });
      },
    });
  };

  return (
    <>
      <StyledCard
        sx={{ minHeight: 130 }}
        onClick={() => navigate(`/forms/builder/${data._id}`)}
      >
        <StyledMoreIcon
          onClick={(e) => {
            e.stopPropagation();
            setAnchorEl(e.currentTarget);
          }}
        >
          <MoreVertIcon />
        </StyledMoreIcon>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <div>
              <img src={clientFormCard} alt="Client Form Document" />
            </div>
            <Box>
              <Typography variant="subtitle2">{data?.name}</Typography>
              <Typography variant="body2" color="rgba(0,0,0,0.6)">
                {data?.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </StyledCard>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <MenuItem>Edit</MenuItem>
        <MenuItem>Preview</MenuItem>
        <MenuItem>Duplicate</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default FormCard;
