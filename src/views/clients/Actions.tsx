import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { useState } from "react";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import { Box } from "@mui/material";
import { useConfirm } from "context/ConfirmDialog";
import { snack } from "components/toast";
import { bulkDelete, bulkUpdate } from "api/services/clients/clients";
import { useMutation, useQueryClient } from "react-query";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "data/permissons";
import { handleError } from "utils/handleError";

interface Props {
  anchorEl: HTMLElement | null;
  setAnchorEl: (v: HTMLElement | null) => void;
  selected: any[];
  clearSelection: () => void;
}

type Type = HTMLElement | null;

function Actions(props: Props) {
  const { anchorEl, setAnchorEl, selected, clearSelection } = props;
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const [nestedAnchorEl, setNestedAnchorEl] = useState<Type>(null);

  const { mutate } = useMutation(bulkDelete, {
    onSuccess: () => {
      snack.success("Clients Deleted");
      queryClient.invalidateQueries("clients");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
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
        <ValidateAccess name={Permissions.EDIT_CLIENTS}>
          <MenuItem onClick={(e) => setNestedAnchorEl(e.currentTarget)}>
            <Box alignItems="center" display="flex" gap={1}>
              Change status
              <ChevronRightOutlinedIcon fontSize="small" />
            </Box>
          </MenuItem>
        </ValidateAccess>
        <ValidateAccess name={Permissions.DELETE_CLIENTS}>
          <MenuItem onClick={handleDelete}>Delete</MenuItem>
        </ValidateAccess>
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
