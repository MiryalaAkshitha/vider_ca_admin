import { Close } from "@mui/icons-material";
import {
  AppBar,
  Drawer,
  FormControl,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { addRemark, updateTask } from "api/services/tasks/tasks";
import LoadingButton from "components/LoadingButton";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation } from "react-query";
import { DialogProps, SubmitType } from "types";
import { handleError } from "utils/handleError";

export const remarkTypes = [
  {
    label: "Pending at client",
    value: "pending_at_client",
  },
  {
    label: "Pending at department",
    value: "pending_at_department",
  },
  {
    label: "Others",
    value: "others",
  },
];

interface AddRemarksProps extends DialogProps {
  remarksPromise: Function[];
  onHoldTaskId: number | null;
}

function AddRemarks(props: AddRemarksProps) {
  const { open, setOpen, remarksPromise, onHoldTaskId } = props;
  const [state, setState] = useState({
    remarks: "",
    remarkType: "",
  });
  const [resolve, reject] = remarksPromise;

  const { mutate, isLoading } = useMutation(addRemark, {
    onSuccess: () => {
      setOpen(false);
      setState({ remarks: "", remarkType: "" });
      resolve();
    },
    onError: (err: any) => {
      reject();
      snack.error(handleError(err));
    },
  });

  const handleClose = () => {
    setOpen(false);
    reject();
  };

  const handleSubmit = (e: SubmitType) => {
    e.preventDefault();
    mutate({ id: onHoldTaskId!, data: state });
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
        <form onSubmit={handleSubmit}>
          <FormControl>
            <RadioGroup
              value={state.remarkType}
              onChange={(e) => setState({ ...state, remarkType: e.target.value })}
            >
              {remarkTypes.map((type, index) => (
                <FormControlLabel
                  key={index}
                  value={type.value}
                  control={<Radio required />}
                  label={type.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <TextField
            sx={{ mt: 2 }}
            variant="outlined"
            fullWidth
            onChange={(e) => setState({ ...state, remarks: e.target.value })}
            value={state.remarks}
            size="small"
            label="Remarks"
            required
            InputLabelProps={{ shrink: true }}
            placeholder="Write something here..."
            multiline
            rows={5}
          />
          <Box display="flex" justifyContent="flex-end" mt={3} gap={2}>
            <LoadingButton
              loading={isLoading}
              fullWidth
              type="submit"
              loadingColor="white"
              title="Add Remarks"
              color="secondary"
            />
          </Box>
        </form>
      </Box>
    </Drawer>
  );
}

export default AddRemarks;
