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
    <Box sx={{ margin: "30px 0" }}>
      <SectionHeading title="Bank Account Details" />
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
            <img
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
              src={bankDetails?.upiAttachment}
              alt=""
            />
            <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
              Scan and pay
            </Typography>
          </Grid>
        )}
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
        {value || "N/A"}
      </Typography>
    </Box>
  );
};

export default BankDetails;
