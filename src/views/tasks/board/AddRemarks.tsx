import { Close } from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { updateTask } from "api/services/tasks";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation } from "react-query";
import { DialogProps } from "types";

interface AddRemarksProps extends DialogProps {
  remarksPromise: Function[];
  onHoldTaskId: number | null;
}

function AddRemarks(props: AddRemarksProps) {
  const { open, setOpen, remarksPromise, onHoldTaskId } = props;

  const [remarks, setRemarks] = useState<string>("");
  const [resolve, reject] = remarksPromise;

  const { mutate, isLoading } = useMutation(updateTask, {
    onSuccess: () => {
      setOpen(false);
      setRemarks("");
      resolve();
    },
    onError: (err: any) => {
      reject();
      snack.error(err.response.data.message);
    },
  });

  const handleClose = () => {
    setOpen(false);
    reject();
  };

  const handleSubmit = () => {
    if (!remarks) return snack.error("Write something down");
    mutate({ id: onHoldTaskId!, data: { remarks } });
  };

  return (
    <Drawer anchor="right" PaperProps={{ sx: { width: 550 } }} open={open}>
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="subtitle1">Add Remarks</Typography>
          <IconButton onClick={handleClose} sx={{ color: "white" }}>
            <Close />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box p={2}>
        <TextField
          sx={{ mt: 2 }}
          variant="outlined"
          fullWidth
          onChange={(e) => setRemarks(e.target.value)}
          value={remarks}
          size="small"
          label="Remarks"
          InputLabelProps={{ shrink: true }}
          placeholder="Write something here..."
          multiline
          rows={5}
        />
        <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
          <LoadingButton
            onClick={handleSubmit}
            loading={isLoading}
            fullWidth
            loadingColor="white"
            title="Add Remarks"
            color="secondary"
          />
        </Box>
      </Box>
    </Drawer>
  );
}

export default AddRemarks;