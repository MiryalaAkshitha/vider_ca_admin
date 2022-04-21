import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { deleteFormValidation } from "api/services/forms";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { StyledCard } from "./styles";

const FormValidationCard = ({ data }: any) => {
  const snack = useSnack();
  const confirm = useConfirm();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteFormValidation, {
    onSuccess: () => {
      setAnchorEl(null);
      queryClient.invalidateQueries("form-validations");
      snack.success("Form validation deleted");
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
          id: data._id,
        });
      },
    });
  };

  return (
    <>
      <StyledCard sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <Box flex={1}>
          <Typography variant="subtitle2">{data?.name}</Typography>
          <Typography variant="body2" color="rgba(0,0,0,0.6)">
            {data?.description}
          </Typography>
        </Box>
        <Box>
          <IconButton
            onClick={(e) => {
              e.stopPropagation();
              setAnchorEl(e.currentTarget);
            }}
          >
            <MoreVertIcon />
          </IconButton>
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
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </>
  );
};

export default FormValidationCard;
