import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { getReceiptPreview } from "api/services/billing/receipts";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddressDetails from "views/billing/estimates/EstimatePreview/AddressDetails";
import SectionHeading from "views/billing/estimates/SectionHeading";
import BasicDetails from "views/billing/invoices/ReceiptPreview/BasicDetails";
import InvoiceDetails from "views/billing/invoices/ReceiptPreview/InvoiceDetails";
import PaymentDetails from "views/billing/invoices/ReceiptPreview/PaymentDetails";

const ReceiptPreview = () => {
  const params = useParams();
  const { queryParams } = useQueryParams();

  const { data, isLoading }: ResType = useQuery(
    ["receipt-particular", params.receiptId],
    getReceiptPreview
  );

  const result = data?.data;

  if (isLoading) return <Loader />;

  return (
    <Box py={2}>
      <Paper
        sx={{
          maxWidth: 1200,
          margin: "auto",
          p: 2,
          ...(queryParams.fromApi && {
            boxShadow: "none",
          }),
        }}
      >
        <BasicDetails result={result} />
        <AddressDetails result={result} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <PaymentDetails result={result} />
          </Grid>
          <Grid item xs={6}>
            <InvoiceDetails result={result} />
          </Grid>
        </Grid>

        {/* <Box sx={{ pageBreakAfter: "always" }}></Box> */}
        
        <Box mt={2}>
          <SectionHeading title="Terms & Conditions" />
          <Box p={1}>
            {result?.termsAndConditions?.map((item: any, index: number) => (
              <Typography mt={1} key={index} variant="body2">
                {index + 1}. {item}
              </Typography>
            ))}
          </Box>
        </Box>
        
      </Paper>
    </Box>
  );
};

export default ReceiptPreview;
