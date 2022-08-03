import { Box, Grid, TextField, Typography } from "@mui/material";
import { getCreditBalance } from "api/services/billing/receipts";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, selectReceipt } from "redux/reducers/createReceiptSlice";
import { ResType } from "types";
import PaymentDetails from "./PaymentDetails";

function AdvanceDetails() {
  const dispatch = useDispatch();
  const state = useSelector(selectReceipt);

  const { isLoading }: ResType = useQuery(
    ["credit-balance", { clientId: state.client }],
    getCreditBalance,
    {
      enabled: Boolean(state.client),
      onSuccess: (res: any) => {
        dispatch(handleChange({ key: "previousCredits", value: res.data }));
      },
    }
  );

  const onChange = (event: any) => {
    const { name, value } = event.target;
    dispatch(handleChange({ key: name, value: value }));
  };

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ maxWidth: 600, mt: 2 }}>
      <TextField
        fullWidth
        label="Advance Amount Received"
        variant="outlined"
        name="amount"
        value={state.amount}
        onChange={onChange}
        size="small"
        type="number"
      />
      <PaymentDetails />
      <Box sx={{ background: "#0C42950D", borderRadius: 1, mt: 2 }}>
        <Typography
          variant="body2"
          color="rgba(0, 0, 0, 0.5)"
          sx={{ borderBottom: "1px solid lightgrey", px: 2, py: 1 }}
        >
          Summary
        </Typography>
        <Box p={2}>
          <SummaryDetail title="Advance amount received" value={state.amount} />
          <SummaryDetail
            title="Previous Unused credits"
            value={state.previousCredits}
          />
          <SummaryDetail
            title="Total Unused Credits"
            value={+state.amount + +state.previousCredits}
          />
        </Box>
      </Box>
    </Box>
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

export default AdvanceDetails;
