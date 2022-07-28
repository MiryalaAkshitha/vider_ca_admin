import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { getBankAccounts } from "api/services/organization";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleBankDetailsChange,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";

import { ResType } from "types";
import SectionHeading from "../SectionHeading";

function BankDetails() {
  const dispatch = useDispatch();
  const { billingEntity, bankDetails } = useSelector(selectEstimate);
  const [bank, setBank] = useState("");

  const { data, isLoading }: ResType = useQuery(
    ["billing-entity-bank-accounts", { billingEntityId: billingEntity }],
    getBankAccounts,
    {
      enabled: Boolean(billingEntity),
    }
  );

  const handleChange = (e: any) => {
    if (e.target.value === "") return;
    setBank(e.target.value);
    let bankAccount = data.data.find((item: any) => item.id === e.target.value);
    if (!bankAccount) return;
    dispatch(handleBankDetailsChange(bankAccount));
  };

  if (isLoading) return <Loader />;

  return (
    <Box mt={3}>
      <SectionHeading title="Bank Account Details" />
      <Grid container spacing={2} alignItems="center" sx={{ p: 2, mt: "0px" }}>
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
              {data?.data?.map((bank: any, index: number) => (
                <MenuItem key={index} value={bank?.id}>
                  {bank.bankName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Box mt={3}>
            {bankDetails && (
              <>
                <BankDetail title="Bank Name" value={bankDetails.bankName} />
                <BankDetail
                  title="Bank Branch"
                  value={bankDetails.branchName}
                />
                <BankDetail
                  title="Bank Account Number"
                  value={bankDetails.accountNumber}
                />
                <BankDetail title="IFSC Code" value={bankDetails.ifscCode} />
                <BankDetail title="UPI ID" value={bankDetails.upiId} />
              </>
            )}
          </Box>
        </Grid>
        {bankDetails?.upiAttachment && (
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <img
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
              src={bankDetails?.upiAttachment}
              alt=""
            />
            <Typography variant="h5">Scan and pay</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export const BankDetail = ({ title, value }) => {
  return (
    <Box sx={{ marginBottom: "16px" }}>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="body2">{title}</Typography>
        </Grid>
        <Grid item xs={1}>
          <span>:</span>
        </Grid>
        <Grid item xs={7}>
          <Typography variant="h6" sx={{ flex: 2 }}>
            {value}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BankDetails;
