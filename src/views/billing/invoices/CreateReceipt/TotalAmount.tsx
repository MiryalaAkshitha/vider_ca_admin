import { Box, Button, Grid, Typography } from "@mui/material";
import { getCreditBalance } from "api/services/billing/receipts";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, selectReceipt } from "redux/reducers/createReceiptSlice";
import Section from "./Section";
import UseCredits from "./UseCredits";

function TotalAmount({ invoiceData }) {
  const dispatch = useDispatch();
  const state = useSelector(selectReceipt);
  const [open, setOpen] = useState(false);

  const { data, isLoading } = useQuery(
    ["credit-balance", { clientId: invoiceData?.client.id }],
    getCreditBalance,
    {
      enabled: Boolean(invoiceData?.client?.id),
    }
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Section title="Total Amount">
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Typography variant="caption">Amount Received</Typography>
            <Typography variant="subtitle2">{state.amount} /-</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="caption">TDS Amount</Typography>
            <Typography variant="subtitle2">{state.tdsAmount} /-</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="caption">Applied Credits</Typography>
            <Box display="flex" gap={2} alignItems="center">
              <Typography variant="subtitle2">
                {state.creditsUsed} /-
              </Typography>
              {state.creditsUsed > 0 && (
                <Button
                  size="small"
                  color="secondary"
                  onClick={() =>
                    dispatch(handleChange({ key: "creditsUsed", value: 0 }))
                  }
                >
                  Remove Credits
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="caption">Available Credits</Typography>
            <Box display="flex" gap={2} alignItems="center">
              <Typography variant="subtitle2">
                {(data?.data || 0) - state.creditsUsed} /-
              </Typography>
              {(data?.data || 0) - state.creditsUsed > 0 && (
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => setOpen(true)}
                >
                  Use Credits
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box
              sx={{
                background: "#F2F6FF",
                display: "flex",
                border: "1px solid #22222226",
                borderRadius: 1,
                maxWidth: 500,
                justifyContent: "space-between",
                p: 2,
                alignItems: "center",
                mt: 2,
              }}
            >
              <Typography variant="caption">Total Usable Amount</Typography>
              <Typography variant="subtitle2">
                {+state.amount + +state.tdsAmount + state.creditsUsed} /-
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Section>
      <UseCredits open={open} credits={data?.data} setOpen={setOpen} />
    </>
  );
}

export default TotalAmount;
