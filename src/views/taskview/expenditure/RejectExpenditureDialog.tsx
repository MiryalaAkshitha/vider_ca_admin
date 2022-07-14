import { Box, Button, TextField } from "@mui/material";
import { rejectExpenditure } from "api/services/expenditure";
import DialogWrapper from "components/DialogWrapper";
import { snack } from "components/toast";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { DialogProps } from "types";

interface IProps extends DialogProps {
  data: any;
}

function RejectExpenditureDialog({ open, setOpen, data }: IProps) {
  const queryClient = useQueryClient();
  const [reason, setReason] = useState<string>("");

  const { mutate } = useMutation(rejectExpenditure, {
    onSuccess: () => {
      snack.success("Expenditure rejected");
      setOpen(false);
      queryClient.invalidateQueries("user_expenditure");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = () => {
    mutate({
      id: data?.id,
      data: {
        reason,
      },
    });
  };

  return (
    <DialogWrapper title="Reject Expense" open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          fullWidth
          rows={3}
          multiline
          label="Reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <Box mt={3} textAlign="center">
          <Button
            type="submit"
            variant="contained"
            size="large"
            color="secondary"
          >
            Reject
          </Button>
        </Box>
      </form>
    </DialogWrapper>
  );
}

export default RejectExpenditureDialog;
