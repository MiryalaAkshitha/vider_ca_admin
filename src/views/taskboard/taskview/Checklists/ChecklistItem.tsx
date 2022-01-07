import { MoreVert } from "@mui/icons-material";
import {
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { deleteChecklistItem, updateChecklistItem } from "api/services/tasks";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { StyledChecklistItem } from "./styles";
import UpdateChecklistItem from "./UpdateChecklistItem";

interface Props {
  data: any;
  index: number;
}

interface ISelected {
  name: string;
  description: string;
}

const CheckListItem = ({ data, index }: Props) => {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<ISelected | null>(null);

  const { mutate } = useMutation(updateChecklistItem, {
    onSuccess: () => {
      snack.success("Checklist item udpated");
      queryClient.invalidateQueries("milestones");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: checklistItemDelete } = useMutation(deleteChecklistItem, {
    onSuccess: () => {
      snack.success("Checklist Item deleted");
      queryClient.invalidateQueries("checklists");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleClick = (e: any) => {
    const status = e.target.checked ? "done" : "pending";
    mutate({
      data: {
        ...data,
        status: status,
      },
    });
  };

  const handleChecklistDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this checklist item?",
      action: () => {
        checklistItemDelete({
          id: data.id,
        });
      },
    });
  };

  return (
    <>
      <StyledChecklistItem
        bgColor={(index + 1) % 2 === 1 ? "#FAFAFA" : "white"}
      >
        <Grid container sx={{ flex: 1 }}>
          <Grid item xs={5}>
            <FormControlLabel
              control={
                <Checkbox
                  onClick={handleClick}
                  defaultChecked={data?.status === "done"}
                  size="small"
                  color="secondary"
                />
              }
              label={<div>{data?.name}</div>}
            />
          </Grid>
          <Grid item xs={5}>
            <div>
              <Typography variant="body2">{data?.description}</Typography>
            </div>
          </Grid>
        </Grid>
        <div>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <MoreVert />
          </IconButton>
        </div>
      </StyledChecklistItem>
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
        <MenuItem onClick={handleChecklistDelete}>Delete</MenuItem>
      </Menu>
      <UpdateChecklistItem
        open={open}
        setOpen={setOpen}
        selectedItem={selectedItem}
      />
    </>
  );
};

export default CheckListItem;
