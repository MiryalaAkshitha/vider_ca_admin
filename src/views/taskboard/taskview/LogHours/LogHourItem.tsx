import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import {
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { deleteLogHour } from "api/services/tasks";
import { useConfirm } from "components/ConfirmDialogProvider";
import useSnack from "hooks/useSnack";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import EditLogHour from "./EditLogHour";

type Props = {
  logHour: any;
  onSelect: (id: number) => void;
  selectedItems: number[];
};

function LogHourItem({ logHour, onSelect, selectedItems }: Props) {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const { mutate } = useMutation(deleteLogHour, {
    onSuccess: () => {
      snack.success("Log Hour Deleted");
      queryClient.invalidateQueries("loghours");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this log hour?",
      action: () => mutate(logHour.id),
    });
  };

  return (
    <>
      <Box
        sx={{
          borderBottom: "1px dotted lightgrey",
          py: 1,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box mr={1}>
            <IconButton
              onClick={(e) => setAnchorEl(e.currentTarget)}
              size="small"
              color="secondary"
            >
              <SettingsOutlinedIcon fontSize="small" />
            </IconButton>
            <Checkbox
              checked={selectedItems.includes(logHour.id)}
              onChange={() => onSelect(logHour.id)}
              disableRipple
              size="small"
            />
          </Box>
          <Typography variant="body2">
            {logHour?.user?.firstName} (
            {moment.utc(+logHour?.duration).format("HH [hrs] mm [mins]")})
          </Typography>
        </Box>
      </Box>
      <Menu
        anchorEl={anchorEl}
        onClick={() => setAnchorEl(null)}
        onClose={() => setAnchorEl(null)}
        open={Boolean(anchorEl)}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        PaperProps={{
          sx: {
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)",
          },
        }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            setOpen(true);
            setSelectedItem(logHour);
          }}
        >
          Edit
        </MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
      <EditLogHour open={open} setOpen={setOpen} selectedItem={selectedItem} />
    </>
  );
}

export default LogHourItem;
