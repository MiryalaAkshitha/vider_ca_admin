import { Box, Button, TextField, Typography } from "@mui/material";
import DialogWrapper from "components/DialogWrapper";
import { snack } from "components/toast";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, selectReceipt } from "redux/reducers/createReceiptSlice";

function UseCredits({ open, setOpen, credits }) {
  const dispatch = useDispatch();
  const state = useSelector(selectReceipt);
  const [amount, setAmount] = useState("");
  const availableCredits = credits - state.creditsUsed;

  const handleSubmit = () => {
    if (+amount > availableCredits) {
      return snack.error("Insufficient credits");
    }
    let value = state.creditsUsed + +amount;
    dispatch(handleChange({ key: "creditsUsed", value }));
    setAmount("");
    setOpen(false);
  };

  return (
    <DialogWrapper width="xs" title="Use Credits" open={open} setOpen={setOpen}>
      <Box
        sx={{
          background: "#F2F6FF",
          display: "flex",
          border: "1px solid #22222226",
          borderRadius: 1,
          maxWidth: 500,
          justifyContent: "space-between",
          px: 2,
          py: 1,
          alignItems: "center",
        }}
      >
        <Typography variant="caption">Available Credits</Typography>
        <Typography variant="subtitle2">{availableCredits} /-</Typography>
      </Box>
      <TextField
        size="small"
        fullWidth
        sx={{ mt: 2 }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        label="Enter Amount"
        variant="outlined"
        type="number"
      />
      <Box textAlign="center" mt={2}>
        <Button
          color="secondary"
          variant="contained"
          disabled={!amount}
          onClick={handleSubmit}
        >
          Apply
        </Button>
      </Box>
    </DialogWrapper>
  );
}

export default UseCredits;
