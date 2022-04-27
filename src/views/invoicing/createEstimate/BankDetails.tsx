import QrCode2Icon from "@mui/icons-material/QrCode2";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  handleBankDetailsChange,
  selectInvoice,
} from "redux/reducers/createInvoiceSlice";
import InvoiceHeadings from "./InvoiceHeadings";

const banks = [
  {
    bankName: "HDFC",
    bankBranch: "Manikonda",
    bankAccountNumber: "8834 8570 8382 5432",
    bankIfscCode: "HDFC0034545",
  },
  {
    bankName: "ICICI",
    bankBranch: "Manikonda",
    bankAccountNumber: "8834 8570 8382 5432",
    bankIfscCode: "HDFC0034545",
  },
];

function BankDetails() {
  const dispatch = useDispatch();
  const state = useSelector(selectInvoice);
  const [bank, setBank] = useState("");

  const handleChange = (e) => {
    if (e.target.value === "") return;
    setBank(e.target.value);
    dispatch(handleBankDetailsChange(banks[e.target.value]));
  };

  return (
    <Box sx={{ margin: "30px 0" }}>
      <InvoiceHeadings title="Bank Account Details" />
      <Grid container sx={{ padding: "20px 0" }} columnSpacing={4}>
        <Grid item xs={6}>
          <FormControl fullWidth size="small">
            <InputLabel id="bank">Select Bank Account</InputLabel>
            <Select
              labelId="bank"
              id="bank"
              value={bank}
              onChange={handleChange}
              label="Select Bank Account"
            >
              <MenuItem value="">-Select-</MenuItem>
              {banks.map((bank, index) => (
                <MenuItem value={index}>{bank.bankName}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={3}>
            {bank !== "" && (
              <>
                <BankDetail title="Bank Name" value={state.bankName} />
                <BankDetail title="Bank Branch" value={state.bankBranch} />
                <BankDetail
                  title="Bank Account Number"
                  value={state.bankAccountNumber}
                />
                <BankDetail title="IFSC Code" value={state.bankIfscCode} />
              </>
            )}
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <QrCode2Icon sx={{ fontSize: "200px" }} />
          <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
            Scan and pay
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

const BankDetail = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Typography
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flex: 1,
        }}
      >
        {title} <span>:</span>
      </Typography>
      <Typography
        sx={{
          flex: 2,
          marginLeft: "20px",
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export default BankDetails;
