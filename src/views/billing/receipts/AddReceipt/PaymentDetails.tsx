import { Box, MenuItem, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, selectReceipt } from "redux/reducers/createReceiptSlice";

function PaymentDetails() {
  const dispatch = useDispatch();
  const state = useSelector(selectReceipt);

  const onChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(handleChange({ key: name, value: value }));
  };

  return (
    <Box sx={{ mt: 2 }}>
      <TextField
        fullWidth
        label="Payment Mode"
        variant="outlined"
        name="paymentMode"
        value={state.paymentMode}
        onChange={onChange}
        size="small"
        select
      >
        <MenuItem value="CASH">Cash</MenuItem>
        <MenuItem value="CHEQUE">Cheque</MenuItem>
        <MenuItem value="CREDIT_CARD">Credit Card</MenuItem>
        <MenuItem value="BANK_TRANSFER">BankTransfer</MenuItem>
        <MenuItem value="UPI">UPI</MenuItem>
        {/* {state?.type !== "ADVANCE" && <MenuItem value="NONE">Please select</MenuItem>}         */}
      </TextField>
      <TextField
        fullWidth
        label="Payment Date"
        variant="outlined"
        name="paymentDate"
        sx={{ mt: 2 }}
        value={state.paymentDate}
        onChange={onChange}
        size="small"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        fullWidth
        label="Reference Number"
        variant="outlined"
        name="referenceNumber"
        sx={{ mt: 2 }}
        value={state.referenceNumber}
        onChange={onChange}
        size="small"
      />
    </Box>
  );
}

export default PaymentDetails;
