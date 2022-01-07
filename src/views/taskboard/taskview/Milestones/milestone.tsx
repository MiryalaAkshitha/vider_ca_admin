import { MoreVert } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { deleteMilestone } from "api/services/tasks";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditMilestone from "./EditMilestone";

type Props = {
  data: any;
  index: number;
};

function MileStone({ data, index }: Props) {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const snack = useSnack();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const { mutate } = useMutation(deleteMilestone, {
    onSuccess: () => {
      snack.success("Milestone deleted");
      queryClient.invalidateQueries("milestones");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this milestone?",
      action: () => {
        mutate(data?.id);
      },
    });
  };

  return (
    <>
      <Box
        sx={{
          minWidth: 300,
          background: "#FBF9F2",
          padding: "10px 10px 10px 10px",
          borderRadius: 3,
          border: "1px solid #EFE5C2",
        }}
      >
        <Box display="flex" alignItems="center">
          <Box flex={1}>
            <Typography variant="h6">
              {index + 1}. {data.name}
            </Typography>
          </Box>
          <div>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              size="small"
            >
              <MoreVert />
            </IconButton>
          </div>
        </Box>
        <Box mt={1} display="flex" alignItems="center">
          <Box flex={1}>
            <Typography variant="body2" color="rgba(0,0,0,0.6)">
              {data?.checklistItems?.length} Checklist Items
            </Typography>
          </Box>
          <Box mr="5px">
            {data?.status === "done" ? (
              <CheckCircleIcon fontSize="medium" sx={{ color: "#89B152" }} />
            ) : (
              <CheckCircleOutlineIcon
                fontSize="medium"
                sx={{ color: "rgba(0,0,0,0.2)" }}
              />
            )}
          </Box>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        onClick={() => setAnchorEl(null)}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            setOpen(true);
            setSelectedItem(data);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <EditMilestone open={open} setOpen={setOpen} data={selectedItem} />
    </>
  );
}

export default MileStone;
