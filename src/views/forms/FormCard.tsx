import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Chip, Typography } from "@mui/material";
import { deleteForm } from "api/services/forms";
import { clientFormCard } from "assets";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import useSnack from "hooks/useSnack";
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import EditForm from "./EditForm";
import { StyledCard, StyledMoreIcon } from "./styles";

const FormCard = ({ data }: any) => {
  const snack = useSnack();
  const confirm = useConfirm();
  const menu = useMenu();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const { mutate } = useMutation(deleteForm, {
    onSuccess: () => {
      queryClient.invalidateQueries("forms");
      snack.success("Form deleted");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this form?",
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
          label: "Preview",
          action: () => window.open(`/forms/access/${data._id}?preview=true`),
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
      <StyledCard
        sx={{ minHeight: 130 }}
        onClick={() => navigate(`/forms/builder/${data._id}`)}
      >
        <StyledMoreIcon onClick={handleMenu}>
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
              <Box pt={2} display="flex" gap={1}>
                {data?.tags?.map((tag: string) => (
                  <Chip size="small" label={tag} variant="outlined" />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </StyledCard>
      <EditForm open={open} setOpen={setOpen} data={data} />
    </>
  );
};

export default FormCard;
