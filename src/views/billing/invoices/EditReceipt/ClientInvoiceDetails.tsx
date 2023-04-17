import { Box, Checkbox, Grid, TextField, Typography } from "@mui/material";
import { getClientInvoices } from "api/services/billing/invoices";
import { getCreditBalance } from "api/services/billing/receipts";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { handleChange, selectReceipt } from "redux/reducers/createReceiptSlice";
import { ResType } from "types";
import Table from "components/Table";
import moment from "moment";
import { useState } from "react";
import { snack } from "components/toast";
import PaymentDetails from "views/billing/receipts/AddReceipt/PaymentDetails";
import { useNavigate } from "react-router-dom";

function ClientInvoiceDetails({ invoicedate }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const state = useSelector(selectReceipt);


  const [invoices, setInvoices] = useState([]);

  const [invoicedamount, setInvoicedamount] = useState(0);
  const [previouscredits, setPreviouscredits] = useState('0');
  const [usedcredits, setUsedcredits] = useState(0);
  const [balanceamount, setBalanceAmount] = useState(0);

  const [errorPrevCredits, setErrorPrevCredits] = useState(false);


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

  const { data, isLoading: isinvoicesLoading }: ResType = useQuery(
    ["invoices", state.client],
    getClientInvoices,
    {
      onSuccess: (res: any) => {
        let yFilter = invoicedate?.map((itemY: any) => { return itemY.id; });
        let filteredX = res?.data.filter((itemX: any) => yFilter.includes(itemX.id));
        filteredX.forEach((item: any) => {
          item['pgpayment'] = 0;
          item['payfullpgpayment'] = false;
          item['servicepayment'] = 0;
          item['payfullservicepayment'] = false;
        });

        setInvoices(filteredX);
      },
      cacheTime: 0,
    }
  );

  const onChange = (event: any) => {
    const { name, value } = event.target;
    if((value * 1) < 0 ) {
      return
    }
    if (name == "previousCredits") {
      if (value > state.previousCredits) {
        setErrorPrevCredits(true);
        snack.error('Enter credits equal to' + state.previousCredits);
      } else {
        setErrorPrevCredits(false);
        setPreviouscredits(value);
        setUsedcredits(value);
        // dispatch(handleChange({ key: name, value: value }));
        dispatch(handleChange({ key: 'creditsUsed', value: value }));
      }
    } else {
      dispatch(handleChange({ key: name, value: value }));
    }
  };

  const onRowChange = (event: any, row: any) => {
    const { name, value } = event.target;
    if((value * 1) < 0 ) {
      return
    }
    if (value <= getTotalAmount() && value > 0) {
      const changedinvoice: any = [];
      const invoicesList = JSON.parse(JSON.stringify(invoices));
      invoicesList.forEach((item: any) => {
        if (item.invoice_number === row.invoice_number) {
          item[name] = value;
          changedinvoice.push(item);
        }
      });
      setInvoices(invoicesList);
      getBalanceTotalAmount(invoicesList);
      setInvoicedamount(getInvoicedAmount(invoicesList));
      dispatch(handleChange({ key: 'invoices', value: changedinvoice }));
    } else {
      snack.error('Please verify Amount received is greater');
    }
    // dispatch(handleChange({ key: 'creditsUsed', value: value }));
  };

  const handleCheckboxChange = (row, checked, type) => {
    const changedinvoice: any = [];
    const invoicesList = JSON.parse(JSON.stringify(invoices));
    invoicesList.forEach((item: any) => {
      if (item.id === row.id) {
        if (type == 'payfullpgpayment') {
          item.payfullpgpayment = checked;
        }
        if (type == 'payfullservicepayment') {
          item.payfullservicepayment = checked;
        }
        item.pgpayment = item.payfullpgpayment ? (+row?.pgamount - +row?.pgdueamount) : (item.pgpayment || 0);
        item.servicepayment = item.payfullservicepayment ? (row?.servicedueamount * 1) : (item.servicepayment || 0);
        changedinvoice.push(item);
      }
    });
    setInvoices(invoicesList);
    setInvoicedamount(getInvoicedAmount(invoicesList));
    getBalanceTotalAmount(invoicesList);
    dispatch(handleChange({ key: 'invoices', value: changedinvoice }));
  }

  const getTotalAmount = () => {
    return +state.amount + +previouscredits;
  }

  const getBalanceTotalAmount = (invoicesList) => {
    const invoicesum = invoicesList.reduce((total, invoice) => total + (+invoice.pgpayment + +invoice.servicepayment), 0);
    setBalanceAmount((+state.amount + +previouscredits) - +invoicesum);
  }

  const getInvoicedAmount = (invoicesList) => {
    return invoicesList.reduce((total, invoice) => total + (+invoice.pgpayment + +invoice.servicepayment), 0);
  }

  let columns = [
    {
      key: "invoice_number",
      title: "Invoice number",
    },
    {
      key: "invoice_date",
      title: "Invoice Date",
      render: (row: any) => {
        return moment(row?.invoice_date).format("DD-MM-YYYY");
      },
    },
    {
      key: "invoice_due_date",
      title: "Due Date",
      render: (row: any) => {
        return moment(row?.invoice_due_date).format("DD-MM-YYYY");
      },
    },
    {
      key: "grand_total",
      title: "Invoice amount",
    },
    {
      key: "pgamount",
      title: "Pure Agent",
    },
    {
      key: "pgdueamount",
      title: "Pure Agent Due Amount",
      render: (row: any) => (
        <>
          {+row?.pgamount - +row?.pgdueamount}
        </>
      ),
    },
    {
      key: "pgpayment",
      title: "Pure agent Payment",
      render: (row: any) => (
        <>
          <TextField
            size="small"
            name="pgpayment"
            sx={{ mt: 2 }}
            value={row?.pgpayment}
            onChange={(e) => onRowChange(e, row)}
            label="Enter Amount"
            variant="outlined"
            type="number"
            disabled={row.payfullpgpayment}
          /><br />
          {/* <Checkbox name="payfullpgpayment" checked={row?.paypgpayment} onChange={(e) => onRowChange(e, row)} /> */}
          <Checkbox
            name="payfullpgpayment"
            onChange={(e) => {
              handleCheckboxChange(
                row,
                e.target.checked,
                'payfullpgpayment'
              );
            }}
            checked={row?.paypgpayment}
            sx={{ width: "auto", m: 0, p: 0 }}
          />
          Pay in full
        </>
      ),
    },
    {
      key: "servicecharge",
      title: "Service Amount",
    },
    {
      key: "servicedueamount",
      title: "Service Due Amount",
      render: (row: any) => (
        <>
          {row?.servicedueamount * 1}
        </>
      )
    },
    {
      key: "servicepayment",
      title: "Service Payment",
      render: (row: any) => (
        <>
          <TextField
            size="small"
            name="servicepayment"
            sx={{ mt: 2 }}
            value={row?.servicepayment}
            onChange={(e) => onRowChange(e, row)}
            label="Service Payment"
            variant="outlined"
            type="number"
            disabled={row.payfullservicepayment}
          />
          {/* <Checkbox name="payfullservicepayment" checked={row?.payservicepayment} onChange={(e) => onRowChange(e, row)} /> */}
          <Checkbox
            name="payfullservicepayment"
            onChange={(e) => {
              handleCheckboxChange(
                row,
                e.target.checked,
                'payfullservicepayment'
              );
            }}
            checked={row?.payservicepayment}
            sx={{ width: "auto", m: 0, p: 0 }}
          />
          Pay in full
        </>
      ),
    },
  ];

  if (isLoading && isinvoicesLoading) return <Loader />;

  return (
    <Box sx={{ mt: 2 }}>

      <Box sx={{ maxWidth: 600, mt: 2 }}>
        <TextField
          fullWidth
          label="Amount Received"
          variant="outlined"
          name="amount"
          value={state.amount}
          onChange={onChange}
          size="small"
          type="number"
        />
      </Box>
      <Box sx={{ maxWidth: 600, mt: 2 }}>
        <PaymentDetails />
      </Box>
      <Box sx={{ maxWidth: 600, mt: 2 }}>
        <TextField
          type="number"
          color="primary"
          label="Credits to use"
          name="previousCredits"
          value={previouscredits}
          onChange={onChange}
          // onChange={(e) => setPreviouscredits(e.target.value)}
          size="small"
          error={errorPrevCredits}
          InputProps={{
            endAdornment: (
              <Typography
                variant="caption"
                sx={{ pl: "2px", "width": "100px", "text-align": "center", "border-left": "1px solid #ddd" }}
                color="rgb(211, 47, 47)"
              >
                {state.previousCredits}
              </Typography>
            )
          }}
        />
      </Box>
      <Box sx={{ background: "#0C42950D", borderRadius: 1, maxWidth: 600, mt: 2, padding: 2 }}>
        {/* <SummaryDetail title="Total Previous credits" value={state.previousCredits + state.amount} /> */}
        {/* <SummaryDetail title="Available unused credites" value={state.previousCredits + +previouscredits} /> */}
        <SummaryDetail title="Available credits:" value={state.previousCredits - +previouscredits} />
        <SummaryDetail title="Total Receipt amount:" value={getTotalAmount()} />
      </Box>

      <Grid container mt={1} spacing={0}>
        <Grid item>
          <Table
            data={invoices || []}
            columns={columns}
            loading={isinvoicesLoading}
          />
        </Grid>
      </Grid>

      <Grid container mt={1} spacing={0}>
        <Grid item>
          <Box sx={{ maxWidth: 800, mt: 2 }}>
            <Box sx={{ background: "#0C42950D", borderRadius: 1, mt: 2 }}>
              <Typography
                variant="body2"
                color="rgba(0, 0, 0, 0.5)"
                sx={{ borderBottom: "1px solid lightgrey", px: 2, py: 1 }}
              >
                Payment Summary
              </Typography>
              <Box p={2}>

                <SummaryDetail title="Amount received" value={state.amount} />
                <SummaryDetail
                  title="Credits used for payment"
                  value={usedcredits}
                />
                <SummaryDetail title="Total Receipt amount" value={getTotalAmount()} />


              </Box>
            </Box>
          </Box>

        </Grid>

        <Grid item>

          <Box sx={{ maxWidth: 800, mt: 2 }}>
            <Box sx={{ background: "#0C42950D", borderRadius: 1, mt: 2 }}>
              <Typography
                variant="body2"
                color="rgba(0, 0, 0, 0.5)"
                sx={{ borderBottom: "1px solid lightgrey", px: 2, py: 1 }}
              >
                Detailed Payment Summary
              </Typography>
              <Box p={2}>
                {/* <SummaryDetail title="Total Receipt amount" value={getTotalAmount()} />
                <SummaryDetail title="Amount received" value={state.amount} />
                <SummaryDetail
                  title="Credits used for payment"
                  value={usedcredits}
                /> */}
                <SummaryDetail
                  title="Invoiced amount for payment"
                  value={invoicedamount}
                />
                <SummaryDetail
                  title="Balance amount added in Credits"
                  value={balanceamount}
                />
                {/* <SummaryDetail
                  title="Previous Credits"
                  value={state.previousCredits}
                /> */}
                <SummaryDetail
                  title="Total Unused Credits"
                  value={+state.previousCredits - +previouscredits + +balanceamount}
                />
              </Box>
            </Box>
          </Box>

        </Grid>
      </Grid>






    </Box >
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

export default ClientInvoiceDetails;
