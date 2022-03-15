import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Box } from "@mui/material";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import { bulkDelete, bulkUpdate } from "api/services/client";
import { useMutation, useQueryClient } from "react-query";

interface Props {
  anchorEl: HTMLElement | null;
  setAnchorEl: (v: HTMLElement | null) => void;
  selected: any[];
  clearSelection: () => void;
}

function Actions({ anchorEl, setAnchorEl, selected, clearSelection }: Props) {
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const snack = useSnack();
  const [nestedAnchorEl, setNestedAnchorEl] = useState<HTMLElement | null>(
    null
  );

  const { mutate } = useMutation(bulkDelete, {
    onSuccess: () => {
      snack.success("Clients Deleted");
      queryClient.invalidateQueries("clients");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const { mutate: updateClients } = useMutation(bulkUpdate, {
    onSuccess: () => {
      snack.success("Clients updated");
      clearSelection();
      queryClient.invalidateQueries("clients");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    setAnchorEl(null);
    confirm({
      msg: "Are you sure you want to delete selected clients?",
      action: () => {
        mutate({
          ids: selected.map((c: any) => c.id),
        });
      },
    });
  };

  const handleStatus = (status: string) => {
    setNestedAnchorEl(null);
    setAnchorEl(null);
    confirm({
      msg: "Are you sure you want to updated selected clients?",
      action: () => {
        updateClients({
          ids: selected.map((c: any) => c.id),
          data: {
            status,
          },
        });
      },
    });
  };

  return (
    <>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={(e) => setNestedAnchorEl(e.currentTarget)}>
          <Box alignItems="center" display="flex" gap={1}>
            Change status
            <ChevronRightOutlinedIcon fontSize="small" />
          </Box>
        </MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <NestedActions
        onClick={handleStatus}
        anchorEl={nestedAnchorEl}
        setAnchorEl={setNestedAnchorEl}
      />
    </>
  );
}

function NestedActions({ anchorEl, setAnchorEl, onClick }) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={() => setAnchorEl(null)}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={() => onClick("active")}>Active</MenuItem>
      <MenuItem onClick={() => onClick("inactive")}>Inactive</MenuItem>
    </Menu>
  );
}

export default Actions;