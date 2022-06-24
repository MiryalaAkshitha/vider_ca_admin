import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Box, Chip, Typography } from "@mui/material";
import { cloneForm, deleteForm } from "api/services/forms";
import { clientFormCard } from "assets";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { snack } from "components/toast";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { StyledCard, StyledMoreIcon } from "./styles";

const FormCard = ({ data }: any) => {
  const confirm = useConfirm();
  const menu = useMenu();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteForm, {
    onSuccess: () => {
      queryClient.invalidateQueries("forms");
      snack.success("Form deleted");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: handleCloneForm } = useMutation(cloneForm, {
    onSuccess: () => {
      queryClient.invalidateQueries("forms");
      snack.success("Form created");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => navigate(`/forms/builder/${data._id}`),
        },
        {
          label: "Preview",
          action: () => window.open(`/forms/access/${data._id}?preview=true`),
        },
        {
          label: "Duplicate",
          action: () => {
            handleCloneForm({
              id: data._id,
              data: {
                type: "TEMPLATE",
              },
            });
          },
        },
        {
          label: "Delete",
          action: () => {
            confirm({
              msg: "Are you sure you want to delete this form?",
              action: () => {
                mutate({
                  id: data._id,
                });
              },
            });
          },
        },
      ],
    });
  };

  return (
    <>
      <StyledCard sx={{ minHeight: 130 }}>
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
    </>
  );
};

export default FormCard;
