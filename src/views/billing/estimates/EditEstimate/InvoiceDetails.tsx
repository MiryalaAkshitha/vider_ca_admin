import { SettingsOutlined } from "@mui/icons-material";
import { Grid, IconButton, MenuItem, TextField } from "@mui/material";
import { getNextInvoiceNumber } from "api/services/billing/invoices";
import Loader from "components/Loader";
import { snack } from "components/toast";
import { DUE_TERMS } from "data/dueTerms";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
  handleFieldChange,
  selectEstimate,
} from "redux/reducers/createEstimateSlice";
import SectionHeading from "views/billing/estimates/SectionHeading";
import InvoiceNumberSettings from "views/billing/invoices/AddInvoice/InvoiceNumberSettings";


function InvoiceDetails({ result }) {
  const {
    estimateNumber,
    estimateDate,
    estimateDueDate,
    terms,
    billingEntity,
  } = useSelector(selectEstimate);

  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  // const [estimateNumber, setEstimateNumber] = useState(result?.invoiceNumber);
  // const [estimateDate, setEstimateDate] = useState(result?.invoiceDate);
  // const [estimateDueDate, setEstimateDueDate] = useState(result?.invoiceDueDate);
  // const [terms, setTerms] = useState(result?.terms);
  // const [billingEntity, setBillingEntity] = useState(result?.billingEntity);

  useEffect(() => {
    if (result?.invoiceNumber && result?.invoiceDate && result?.invoiceDueDate) {
      setTimeout(() => {
        dispatch(handleFieldChange({ key: "estimateNumber", value: result?.invoiceNumber }));
        dispatch(handleFieldChange({ key: "estimateDate", value: result?.invoiceDate }));
        dispatch(handleFieldChange({ key: "estimateDueDate", value: result?.invoiceDueDate }));
        dispatch(handleFieldChange({ key: "terms", value: result?.terms }));
      }, 500);
    }
  }, []);

  // const { isLoading } = useQuery(
  //   ["next-invoice-number", billingEntity],
  //   getNextInvoiceNumber,

  //   {
  //     onSuccess: (res: any) => {
  //       dispatch(handleFieldChange({ key: "invoiceNumber", value: res.data }));
  //       dispatch(
  //         handleFieldChange({ key: "autoGeneratedNumber", value: res.data })
  //       );
  //     },
  //     enabled: Boolean(billingEntity),
  //   }
  // );

  const handleChange = (e: any) => {
    dispatch(
      handleFieldChange({
        key: e.target.name,
        value: e.target.value,
      })
    );
  };

  const handleSettings = (e: any) => {
    if (!billingEntity) return snack.error("Please select a billing entity");

    dispatch(handleFieldChange({ key: "estimateNumber", value: estimateNumber }));
    dispatch(
      handleFieldChange({ key: "autoGeneratedNumber", value: estimateNumber })
    );

    setOpen(true);
  };

  return (
    <>
      <Grid container mt={5}>
        <Grid item xs={12}>
          <SectionHeading title="Invoice Details" />
          <Grid container spacing={2} mt={1}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                size="small"
                label="Invoice Number"
                variant="outlined"
                disabled
                name="estimateNumber"
                value={estimateNumber}
                InputProps={{
                  endAdornment: (
                    <></>
                    // <IconButton onClick={handleSettings}>
                    //   <SettingsOutlined fontSize="small" />
                    // </IconButton>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                size="small"
                fullWidth
                type="date"
                InputLabelProps={{ shrink: true }}
                label="Invoice Date"
                variant="outlined"
                value={estimateDate}
                name="estimateDate"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                size="small"
                label="Terms"
                disabled={!estimateDate}
                variant="outlined"
                value={terms}
                name="terms"
                onChange={handleChange}
              >
                {DUE_TERMS.map((item, index) => (
                  <MenuItem value={item.value} key={index}>
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="date"
                disabled={terms !== "CUSTOM_DUE_DATE"}
                InputLabelProps={{ shrink: true }}
                label="Due Date"
                size="small"
                variant="outlined"
                value={estimateDueDate}
                name="estimateDueDate"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <InvoiceNumberSettings open={open} setOpen={setOpen} />
    </>
  );
}

export default InvoiceDetails;