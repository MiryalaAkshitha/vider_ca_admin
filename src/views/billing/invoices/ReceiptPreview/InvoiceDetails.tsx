import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { BankDetail } from "views/billing/estimates/AddEstimate/BankDetails";
import SectionHeading from "views/billing/estimates/SectionHeading";

interface IProps {
  result: any;
}

function InvoiceDetails({ result }: IProps) {
  return (
    <Box mt={3}>
      <SectionHeading title="Invoice Details" />
      <Grid container spacing={2} sx={{ p: 2, mt: "0px" }}>
        <Grid item xs={6}>
          {result && (
            <>
              <BankDetail
                title="Invoice number"
                value={result?.invoiceNumber}
              />
              <BankDetail
                title="Invoice amount"
                value={result?.totalCharges + '/-'}
              />
              <BankDetail
                title="Balance Due"
                value={result?.totalCharges + '/-'}
              />
              <BankDetail
                title="Invoice Date"
                value={result?.invoiceDate}
              />
              <BankDetail
                title="Due Date"
                value={result?.invoiceDate}
              />
              
            </>
          )}
        </Grid>

      </Grid>
    </Box>
  );
}

export default InvoiceDetails;
