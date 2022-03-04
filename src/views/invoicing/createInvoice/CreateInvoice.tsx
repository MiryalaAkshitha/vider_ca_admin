import React, { useState } from "react";
import { ArrowBack } from "@mui/icons-material";
import EditIcon from "@mui/icons-material/Edit";
import { logo } from "assets";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import useTitle from "hooks/useTitle";
import InvoiceList from "./InvoiceList";
import InvoiceTable from "./InvoiceTable";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import DraggableListItems from "./DraggableListItems";
import InvoiceHeadings from "./InvoiceHeadings";

const billingAddress = [
  {
    title: "Business name",
    value: "Vider Business Solutions",
  },
  {
    title: "Address",
    value: "2/91/20, BP Raju Marg, Laxmi Cyber City, Whitefields, Kondapur, Telangana 500081",
  },
  {
    title: "Mail Address",
    value: "Viderbusiness@gmail.com",
  },
  {
    title: "Mobile",
    value: "9947368386",
  },
  {
    title: "GST Treatment",
    value: "Registered Business - Regular",
  },
  {
    title: "GSTIN",
    value: "365473538457",
  },
];

const shippingAddress = [
  {
    title: "Business name",
    value: "Vider Business Solutions",
  },
  {
    title: "Address",
    value: "2/91/20, BP Raju Marg, Laxmi Cyber City, Whitefields, Kondapur, Telangana 500081",
  },
  {
    title: "Mail Address",
    value: "Viderbusiness@gmail.com",
  },
  {
    title: "Mobile",
    value: "9947368386",
  },
];

const bankData = [
  {
    title: "Bank Name",
    value: "HDFC Bank",
  },
  {
    title: "Bank Branch",
    value: "Manikonda",
  },
  {
    title: "Bank Account Number",
    value: "8834 8570 8382 5432",
  },
  {
    title: "IFSC Code",
    value: "HDFC0034545",
  },
];

export const CreateInvoice = ({ setOpen }) => {
  useTitle(
    <>
      <Typography
        variant="body2"
        sx={{
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          fontSize: "16px",
        }}
        onClick={() => setOpen(false)}
      >
        <ArrowBack /> New Invoice
      </Typography>
    </>
  );

  const [invoiceCustomer, setInvoiceCustomer] = useState("");
  const [placeOfSupply, setPlaceOfSupply] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [invoiceTerms, setInvoiceTerms] = useState("");
  const [invoiceDueDate, setInvoiceDueDate] = useState("");
  const [bank, setBank] = useState("");

  return (
    <>
      <Box
        sx={{
          maxWidth: "1500px",
          margin: "0 auto",
          padding: "30px 0",
        }}
      >
        <Box>
          <Typography
            variant="body1"
            sx={{
              fontSize: "28px",
              textTransform: "uppercase",
              fontWeight: "500",
              textAlign: "center",
              flexGrow: 1,
              marginBottom: "50px",
            }}
          >
            Tax Invoice
          </Typography>
        </Box>
        <Grid container>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="invoiceCustomer">Customer</InputLabel>
              <Select
                labelId="invoiceCustomer"
                id="invoiceCustomer"
                value={invoiceCustomer}
                label="Customer"
                defaultValue="customer1"
                onChange={(e) => {
                  setInvoiceCustomer(e.target.value);
                }}
              >
                <MenuItem value={"customer1"}>Vider Soft</MenuItem>
                <MenuItem value={"customer2"}>Vider Softawre</MenuItem>
                <MenuItem value={"customer3"}>Vider Software Solutions</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Box sx={{ margin: "30px 0" }}>
          <Grid container spacing={2} alignItems="baseline" columnSpacing={4}>
            <Grid item xs={6}>
              <InvoiceHeadings title={"Billing Address"} />
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <img src={logo} alt="" />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "#F2353C",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <EditIcon />
                    Edit
                  </Typography>
                </Box>
                <InvoiceList data={billingAddress} />
              </Box>
              <FormControl
                sx={{
                  width: "80%",
                }}
              >
                <InputLabel id="placeOfSupply">Place of Supply *</InputLabel>
                <Select
                  labelId="placeOfSupply"
                  id="placeOfSupply"
                  value={placeOfSupply}
                  label="placeOfSupply"
                  onChange={(e) => {
                    setPlaceOfSupply(e.target.value);
                  }}
                >
                  <MenuItem value="place1">27 : Maharashtra [MH]</MenuItem>
                  <MenuItem value={"place11"}>place1</MenuItem>
                  <MenuItem value={"place2"}>place2</MenuItem>
                  <MenuItem value={"place3"}>place3 </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <InvoiceHeadings title={"Shipping Address"} />
              <Box
                sx={{
                  padding: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <img src={logo} alt="" />
                  <Typography
                    sx={{
                      fontWeight: "600",
                      color: "#F2353C",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <EditIcon />
                    Edit
                  </Typography>
                </Box>
                <InvoiceList data={shippingAddress} />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <InvoiceHeadings title="Invoice Details" />
              <Grid container sx={{ padding: "30px 0" }}>
                <Grid
                  item
                  xs={6}
                  sx={{
                    marginBottom: "30px",
                  }}
                >
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    value={invoiceNumber}
                    onChange={(e) => {
                      setInvoiceNumber(e.target.value);
                    }}
                    label="Invoice number"
                    variant="outlined"
                  />
                </Grid>
                <Grid container columnSpacing={3}>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      id="date"
                      type={"date"}
                      InputLabelProps={{ shrink: true }}
                      label="Invoice Date"
                      variant="outlined"
                      value={invoiceDate}
                      onChange={(e) => {
                        setInvoiceDate(e.target.value);
                      }}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <FormControl fullWidth>
                      <InputLabel id="terms">Terms</InputLabel>
                      <Select
                        labelId="terms"
                        id="demo-simple-select-helper"
                        value={invoiceTerms}
                        onChange={(e) => setInvoiceTerms(e.target.value)}
                        label="Terms"
                      >
                        <MenuItem value="term0">Net 30</MenuItem>
                        <MenuItem value={"term1"}>Vider Soft</MenuItem>
                        <MenuItem value={"term2"}>Vider Softawre</MenuItem>
                        <MenuItem value={"term3"}>Vider Software Solutions</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      fullWidth
                      id="dueDate"
                      type={"date"}
                      InputLabelProps={{ shrink: true }}
                      label="Due Date"
                      variant="outlined"
                      value={invoiceDueDate}
                      onChange={(e) => {
                        setInvoiceDueDate(e.target.value);
                      }}
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ margin: "30px 0" }}>
          <InvoiceTable />
          <Grid container>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={4}></Grid>
          </Grid>
        </Box>
        <Box sx={{ margin: "30px 0" }}>
          <InvoiceHeadings title="Bank Account Details" />
          <Grid container sx={{ padding: "20px 0" }} columnSpacing={4}>
            <Grid item xs={6}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  height: "100%",
                  padding: "0 20px",
                }}
              >
                <FormControl fullWidth>
                  <InputLabel id="bank">Select Bank Account</InputLabel>
                  <Select
                    labelId="bank"
                    id="bank"
                    value={bank}
                    onChange={(e) => {
                      setBank(e.target.value);
                    }}
                    label="Select Bank Account"
                  >
                    <MenuItem value={"bank1"}>HDFC</MenuItem>
                    <MenuItem value={"bank2"}>Vider Softawre</MenuItem>
                    <MenuItem value={"bank3"}>Vider Software Solutions</MenuItem>
                  </Select>
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {bankData.map((data, index) => {
                    return (
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          alignItems: "baseline",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",

                            flex: 1,
                          }}
                        >
                          {data.title} <span>:</span>
                        </Typography>
                        <Typography
                          sx={{
                            flex: 2,
                            marginLeft: "20px",
                          }}
                        >
                          {data.value}
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <QrCode2Icon sx={{ fontSize: "200px" }} />
              <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>Scan and pay</Typography>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ margin: "30px 0" }}>
          <InvoiceHeadings title="Terms & Conditions" />
          <Grid container columnSpacing={3}>
            <Grid item xs={8}>
              <DraggableListItems />
            </Grid>
            <Grid item xs={4}>
              <Box sx={{ padding: "20px 0" }}>
                <Typography>Signature / Digital Signature</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box sx={{ margin: "50px 0 100px 0" }}>
          <Typography sx={{ textAlign: "center" }}>
            For any enquiry, reach out via email viderbusiness@gmail.com or call on +91 81211 81212
          </Typography>
        </Box>
      </Box>
      <Paper
        elevation={3}
        sx={{
          position: "fixed",
          bottom: "0",
          width: "100%",
          zIndex: "100",
        }}
      >
        <Box
          sx={{
            maxWidth: "1500px",
            width: "100%",
            padding: "15px 0",
            margin: "0 auto",
          }}
        >
          <Button
            variant="outlined"
            sx={{
              maxWidth: "250px",
              width: "100%",
              padding: "15px 0",
              backgroundColor: "#EFEFEF",
              color: "#222222",
              border: "0",
              marginRight: "30px",
              ":hover": {
                border: "0",
                backgroundColor: "#cccccc",
              },
            }}
          >
            <Typography variant="h6">Save as Draft</Typography>
          </Button>
          <Button
            color="secondary"
            variant="contained"
            sx={{
              maxWidth: "250px",
              width: "100%",
              padding: "15px 0",
            }}
          >
            <Typography variant="h6">Save as Draft</Typography>
          </Button>
        </Box>
      </Paper>
    </>
  );
};
