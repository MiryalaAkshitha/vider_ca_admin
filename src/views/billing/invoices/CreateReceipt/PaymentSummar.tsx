import { Box, Typography, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import { selectReceipt } from "redux/reducers/createReceiptSlice";
import Section from "./Section";

function PaymentSummary() {
  const state = useSelector(selectReceipt);

  return (
    <Section title="Payment Summary">
      <Box sx={{ background: "#0C42950D", borderRadius: 1, maxWidth: 600 }}>
        <Typography
          variant="body2"
          color="rgba(0, 0, 0, 0.6)"
          sx={{ borderBottom: "1px solid lightgrey", px: 2, py: 1 }}
        >
          Payment Summary
        </Typography>
        <Box p={2}>
          <SummaryDetail title="Amount received" value={state.amount} />
          <SummaryDetail title="Tax Deduction Amount" value={state.amount} />
          <SummaryDetail title="Total Credits Used" value={state.amount} />
        </Box>
      </Box>
    </Section>
  );
}

const SummaryDetail = ({ title, value }) => {
  return (
    <Grid container spacing={2} sx={{ mb: 2 }} alignItems="center">
      <Grid item xs={5}>
        <Typography variant="body2">{title}</Typography>
      </Grid>
      <Grid item xs={1}>
        <Typography variant="body1">:</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography variant="body1">{value} /-</Typography>
      </Grid>
    </Grid>
  );
};

export default PaymentSummary;
