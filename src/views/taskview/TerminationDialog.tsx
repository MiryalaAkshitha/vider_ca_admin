import { Box, Button, TextField } from "@mui/material";
import { terminateTask } from "api/services/tasks/tasks";
import DialogWrapper from "components/DialogWrapper";
import { snack } from "components/toast";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { DialogProps } from "types";
import { useState } from "react";
import { handleError } from "utils/handleError";

function TerminationDialog({ open, setOpen }: DialogProps) {
  const params = useParams();
  const navigate = useNavigate();
  const [reason, setReason] = useState("");

  const { mutate: terminate } = useMutation(terminateTask, {
    onSuccess: () => {
      snack.success("Task terminated");
      navigate("/task-board");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!reason) {
      snack.error("Please enter a reason");
      return;
    }
    terminate({
      id: params.taskId,
      reason,
    });
  };

  return (
    <DialogWrapper title="Terminate Task" open={open} setOpen={setOpen}>
      <TextField
        value={reason}
        fullWidth
        label="Reason for termination"
        rows={4}
        onChange={(e) => setReason(e.target.value)}
        multiline
      />
      <Box textAlign="right" mt={3}>
        <Button onClick={handleSubmit} variant="contained" color="secondary">
          Terminate
        </Button>
      </Box>
    </DialogWrapper>
  );
}

export default TerminationDialog;
