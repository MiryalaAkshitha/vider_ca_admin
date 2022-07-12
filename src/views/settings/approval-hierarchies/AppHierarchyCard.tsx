import { MoreVert } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { deleteAppHierarchy } from "api/services/approval-heirarchy";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useMenu } from "context/MenuPopover";
import { MouseEvent } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { handleError } from "utils/handleError";

function ApprovalHierarchyCard({ item }: any) {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const menu = useMenu();

  const { mutate } = useMutation(deleteAppHierarchy, {
    onSuccess: () => {
      queryClient.invalidateQueries("approval-heirarchies");
      navigate("/settings/approvals");
    },
    onError: (error: any) => {
      snack.error(handleError(error));
    },
  });

  const handleMenu = (e: MouseEvent<HTMLButtonElement>, id: number) => {
    menu({
      target: e.currentTarget,
      options: [
        {
          label: "Edit",
          action: () => navigate(`add-approval?approvalId=${id}`),
        },
        {
          label: "Delete",
          action: () => {
            confirm({
              msg: "Are you sure you want to delete this approval hierarchy?",
              action: () => mutate(id),
            });
          },
        },
      ],
    });
  };

  return (
    <Box
      sx={{
        boxShadow: "0px 3px 12px #0000001A",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Box display="flex" gap={1} justifyContent="space-between">
        <Typography variant="subtitle2">{item.name}</Typography>
        <IconButton onClick={(e) => handleMenu(e, item?.id)}>
          <MoreVert />
        </IconButton>
      </Box>
      <Typography variant="body2" color="rgba(0,0,0,0.5)">
        Type of Approval Hierarchy : {item.type}
      </Typography>
    </Box>
  );
}

export default ApprovalHierarchyCard;
