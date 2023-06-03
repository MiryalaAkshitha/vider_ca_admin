import { Grid, TextField } from "@mui/material";
import { getNextReceiptNumber } from "api/services/billing/receipts";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import Section from "./Section";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { handleChange, selectReceipt } from "redux/reducers/createReceiptSlice";
import moment from "moment";

function BasicDetails({ invoiceData }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const state = useSelector(selectReceipt);
  
  const { data, isLoading } = useQuery(
    ["next-receipt-number"],
    getNextReceiptNumber,
    {
      onSuccess: (res: any) => {
        dispatch(handleChange({ key: "receiptNumber", value: res.data }));
        dispatch(handleChange({ key: "receiptDate", value: moment().format("YYYY-MM-DD") }));
        dispatch(handleChange({ key: "paymentDate", value: moment().format("YYYY-MM-DD") }));
        dispatch(handleChange({ key: "amount", value: 0 }));
        dispatch(handleChange({ key: "previousCredits", value: 0 }));
      },
    }
  );

  if (isLoading) return <Loader />;

  return (
    <Section title="Receipt Details">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="Receipt Number"
            variant="outlined"
            value={data?.data || ""}
            disabled
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="Receipt Date"
            variant="outlined"
            fullWidth
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="Invoice Number"
            variant="outlined"
            fullWidth
            value={invoiceData?.invoiceNumber || ""}
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="Billing Entity"
            value={invoiceData?.billingEntity?.legalName || ""}
            variant="outlined"
            fullWidth
            disabled
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            size="small"
            label="Client"
            variant="outlined"
            fullWidth
            value={invoiceData?.client?.displayName || ""}
            disabled
          />
        </Grid>
      </Grid>
    </Section>
  );
}

export default BasicDetails;
