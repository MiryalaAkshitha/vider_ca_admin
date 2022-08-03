import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, selectReceipt } from "redux/reducers/createReceiptSlice";
import Section from "./Section";

function PaymentDetails({ invoiceData }) {
  const dispatch = useDispatch();
  const state = useSelector(selectReceipt);
  const [hasTax, setHasTax] = useState("NO");

  const onChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(handleChange({ key: name, value: value }));
  };

  return (
    <Section title="Payment Details">
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Invoice Amount"
            variant="outlined"
            fullWidth
            value={invoiceData?.grandTotal || ""}
            disabled
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            size="small"
            label="Payment Received"
            variant="outlined"
            type="number"
            name="amount"
            onChange={onChange}
            value={state.amount}
            fullWidth
          />
        </Grid>
        <Grid item xs={3}>
          <FormControlLabel
            onChange={(e: any) => {
              if (e.target.checked) {
                dispatch(
                  handleChange({
                    key: "amount",
                    value: invoiceData?.grandTotal,
                  })
                );
              }
            }}
            control={
              <Checkbox checked={+state.amount === invoiceData?.grandTotal} />
            }
            label={
              <Typography variant="body2">
                Received full invoice amount
              </Typography>
            }
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={12}>
          <FormControl>
            <FormLabel>Tax Deducted Amount</FormLabel>
            <RadioGroup
              row
              value={hasTax}
              onChange={(e) => {
                setHasTax(e.target.value);
                if (e.target.value === "NO") {
                  dispatch(handleChange({ key: "tds", value: "" }));
                  dispatch(handleChange({ key: "tdsAmount", value: 0 }));
                }
              }}
            >
              <FormControlLabel
                value="YES"
                control={<Radio />}
                label={
                  <Typography variant="body2">
                    TDS Deducted (Income Tax)
                  </Typography>
                }
              />
              <FormControlLabel
                value="NO"
                control={<Radio />}
                label={<Typography variant="body2">No Tax Deducted</Typography>}
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {hasTax === "YES" && (
          <>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Select Tax"
                variant="outlined"
                name="tds"
                value={state.tds}
                onChange={onChange}
                size="small"
                select
              >
                <MenuItem value="Payment of contractors for Others - [2 %]">
                  Payment of contractors for Others - [2 %]
                </MenuItem>
                <MenuItem value="Payment of contractors HUF/Individuals - [1%]">
                  Payment of contractors HUF/Individuals - [1%]
                </MenuItem>
                <MenuItem value="Payment of contractors for Others - [2 %]">
                  Payment of contractors for Others - [2 %]
                </MenuItem>
                <MenuItem value="BANK_TRANSFER">BankTransfer</MenuItem>
                <MenuItem value="Professional fees - [10%]">
                  Professional fees - [10%]
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                label="Tax Deduction Amount"
                variant="outlined"
                name="tdsAmount"
                value={state.tdsAmount}
                onChange={onChange}
                size="small"
              />
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2} mt={2}>
        <Grid item xs={4}>
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
          </TextField>
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Payment Date"
            variant="outlined"
            name="paymentDate"
            value={state.paymentDate}
            onChange={onChange}
            size="small"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            label="Reference Number"
            variant="outlined"
            name="referenceNumber"
            value={state.referenceNumber}
            onChange={onChange}
            size="small"
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default PaymentDetails;
