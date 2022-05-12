import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, IconButton, Typography } from "@mui/material";
import { deleteFormValidation } from "api/services/forms";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { snack } from "components/toast";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { StyledCard } from "../styles";
import EditFormValidation from "./EditFormValidation";

const FormValidationCard = ({ data }: any) => {
  const queryClient = useQueryClient();

  const confirm = useConfirm();
  const menu = useMenu();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(deleteFormValidation, {
    onSuccess: () => {
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

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => setOpen(true),
        },
        {
          label: "Delete",
          action: handleDelete,
        },
      ],
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
          <IconButton onClick={handleMenu}>
            <MoreVertIcon />
          </IconButton>
        </Box>
      </StyledCard>
      <EditFormValidation data={data} open={open} setOpen={setOpen} />
    </>
  );
};

export default FormValidationCard;
