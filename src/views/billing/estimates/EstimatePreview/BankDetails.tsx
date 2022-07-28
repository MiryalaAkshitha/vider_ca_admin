import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BankDetail } from "views/billing/estimates/AddEstimate/BankDetails";
import SectionHeading from "views/billing/estimates/SectionHeading";

interface IProps {
  result: any;
}

function BankDetails({ result }: IProps) {
  return (
    <Box mt={3}>
      <SectionHeading title="Bank Account Details" />
      <Grid container spacing={2} sx={{ p: 2, mt: "0px" }}>
        <Grid item xs={6}>
          {result?.bankDetails && (
            <>
              <BankDetail
                title="Bank Name"
                value={result?.bankDetails.bankName}
              />
              <BankDetail
                title="Bank Branch"
                value={result?.bankDetails.branchName}
              />
              <BankDetail
                title="Bank Account Number"
                value={result?.bankDetails.accountNumber}
              />
              <BankDetail
                title="IFSC Code"
                value={result?.bankDetails.ifscCode}
              />
              <BankDetail title="UPI ID" value={result?.bankDetails.upiId} />
            </>
          )}
        </Grid>
        {result?.bankDetails?.upiAttachment && (
          <Grid item xs={6} sx={{ textAlign: "center" }}>
            <img
              style={{
                width: "200px",
                height: "200px",
                objectFit: "cover",
              }}
              src={result?.bankDetails?.upiAttachment}
              alt=""
            />
            <Typography variant="h5">Scan and pay</Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default BankDetails;
