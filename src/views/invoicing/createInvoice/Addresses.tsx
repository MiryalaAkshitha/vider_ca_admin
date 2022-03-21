import EditIcon from "@mui/icons-material/Edit";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { logo } from "assets";
import { useSelector } from "react-redux";
import { selectInvoice } from "redux/reducers/createInvoiceSlice";
import InvoiceHeadings from "./InvoiceHeadings";

function Addresses() {
  const { billingAddress, shippingAddress } = useSelector(selectInvoice);

  const getAddress = (address) => {
    let result = "";
    if (address?.address) {
      result += address.address;
    }
    if (address?.city) {
      result += ", " + address.city;
    }
    if (address?.state) {
      result += ", " + address.state;
    }
    if (address?.pincode) {
      result += ", " + address.pincode;
    }
    return result;
  };

  return (
    <Box sx={{ margin: "30px 0" }}>
      <Grid container spacing={2} alignItems="baseline" columnSpacing={4}>
        <Grid item xs={6}>
          <InvoiceHeadings title={"Billing Address"} />
          <Box p={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <img src={logo} alt="" />
              <Button
                startIcon={<EditIcon fontSize="small" />}
                color="secondary"
              >
                Edit
              </Button>
            </Box>
            <AddressDetail
              title="Business Name"
              value={billingAddress?.businessName}
            />
            <AddressDetail title="Address" value={getAddress(billingAddress)} />
            <AddressDetail title="Email" value={billingAddress?.email} />
            <AddressDetail
              title="Mobile Number"
              value={billingAddress?.mobileNumber}
            />
            <AddressDetail
              title="GST Treatment"
              value={billingAddress?.gstTreatment}
            />
            <AddressDetail title="GSTIN" value={billingAddress?.gstIn} />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <InvoiceHeadings title={"Shipping Address"} />
          <Box p={2}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <img src={logo} alt="" />
              <Button
                startIcon={<EditIcon fontSize="small" />}
                color="secondary"
              >
                Edit
              </Button>
            </Box>
            <AddressDetail
              title="Business Name"
              value={shippingAddress?.businessName}
            />
            <AddressDetail
              title="Address"
              value={getAddress(shippingAddress)}
            />
            <AddressDetail title="Email" value={shippingAddress?.email} />
            <AddressDetail
              title="Mobile Number"
              value={shippingAddress?.mobileNumber}
            />
            <AddressDetail
              title="GST Treatment"
              value={shippingAddress?.gstTreatment}
            />
            <AddressDetail title="GSTIN" value={shippingAddress?.gstIn} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

const AddressDetail = ({ title, value }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        margin: "20px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
        }}
      >
        <Typography
          variant="body1"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flex: 1,
          }}
        >
          {title}
          <span>:</span>
        </Typography>
        <Typography
          variant="subtitle2"
          sx={{
            flex: 2,
            marginLeft: "20px",
            fontWeight: "600",
          }}
        >
          {value}
        </Typography>
      </Box>
    </Box>
  );
};

export default Addresses;
