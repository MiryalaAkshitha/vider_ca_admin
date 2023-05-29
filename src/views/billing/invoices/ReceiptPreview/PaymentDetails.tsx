import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BankDetail } from "views/billing/estimates/AddEstimate/BankDetails";
import SectionHeading from "views/billing/estimates/SectionHeading";

interface IProps {
  result: any;
}

function PaymentDetails({ result }: IProps) {
  return (
    <Box mt={3}>
      <SectionHeading title="Payment Details" />
      <Grid container spacing={2} sx={{ p: 2, mt: "0px" }}>
        <Grid item xs={6}>
          {result && (
            <>
              <BankDetail
                title="Total Amount received"
                value={(+result?.amount) + (+result?.creditsUsed) + '/-'}
              />
              <BankDetail
                title="Amount"
                value={(+result?.amount) + '/-'}
              />
              <BankDetail
                title="Credits Used"
                value={result?.creditsUsed + '/-'}
              />
              <BankDetail
                title="Previous Credits"
                value={result?.totalCredits + '/-'}
              />
              <BankDetail
                title="Total Unused Credits"
                value={-((result?.creditsUsed * 1 || 0) - (result?.totalCredits * 1 || 0)) + '/-'}
              />
              <BankDetail
                title="Due Amount"
                value={-(result?.dueAmount || 0) + '/-'}
              />
              {/* <BankDetail
                title="TDS Deduction"
                value={result?.totalCharges + '%'}
              /> */}
              <BankDetail
                title="Payment mode"
                value={result?.paymentMode}
              />
              <BankDetail
                title="Payment Date"
                value={result?.paymentDate}
              />
              <BankDetail
                title="Reference number"
                value={result?.referenceNumber}
              />
              {/* <BankDetail
                title="Notes"
                value={result?.invoiceDate}
              /> */}
            </>
          )}
        </Grid>

      </Grid>
    </Box>
  );
}

export default PaymentDetails;