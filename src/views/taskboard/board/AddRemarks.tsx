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
import { updateTask } from "api/tasks";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation } from "react-query";
import { DialogProps } from "types";

interface AddRemarksProps extends DialogProps {
  remarksResolveReject: Function[];
  onHoldTaskId: number | null;
}

function AddRemarks(props: AddRemarksProps) {
  const { open, setOpen, remarksResolveReject, onHoldTaskId } = props;
  const snack = useSnack();
  const [remarks, setRemarks] = useState<string>("");
  const [resolve, reject] = remarksResolveReject;

  const { mutate, isLoading } = useMutation(updateTask, {
    onSuccess: () => {
      setOpen(false);
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
