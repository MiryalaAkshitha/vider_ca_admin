import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { logo } from "assets";
import { getAddress } from "views/billing/estimates/AddEstimate/BillingEntityDetails";
import SectionHeading from "views/billing/estimates/SectionHeading";

function AddressDetails({ result }) {
  return (
    <Box mt={2}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <SectionHeading title="Billing Address" />
          <Box p={1}>
            <Typography variant="body2">
              {result?.client?.address?.billingaddress?.legalName}
            </Typography>
            <Typography variant="body2">
              {result?.client?.address?.billingaddress?.buildingName},
            </Typography>
            <Typography variant="body2">
              {result?.client?.address?.billingaddress?.street}, {result?.client?.address?.billingaddress?.city},
            </Typography>
            <Typography variant="body2">
              {result?.client?.address?.billingaddress?.state}, {result?.client?.address?.billingaddress?.pincode}
            </Typography>

            {/* <Box mb={1}>
              <img src={logo} alt="" />
            </Box> */}
            {/* <Typography variant="body2">
              {result?.billingAddress?.legalName}
            </Typography>
            <Typography variant="body2">
              {getAddress(result?.billingAddress)}
            </Typography>
            */}
            <Typography variant="body2">
              {result?.client?.address?.billingAddress?.mobileNumber},{" "}
              {result?.client?.address?.billingAddress?.email}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6}>
          {/* <SectionHeading title="Shipping Address" />
          <Box p={1}>
            <Typography variant="body2">
              {result?.client?.address?.shippingaddress?.legalName}
            </Typography>
            <Typography variant="body2">
              {result?.client?.address?.shippingaddress?.buildingName},
            </Typography>
            <Typography variant="body2">
              {result?.client?.address?.shippingaddress?.street}, {result?.client?.address?.shippingaddress?.city},
            </Typography>
            <Typography variant="body2">
              {result?.client?.address?.shippingaddress?.state}, {result?.client?.address?.shippingaddress?.pincode}
            </Typography> */}


            {/* <Box mb={1}>
              <img src={logo} alt="" />
            </Box> */}
            {/* <Typography variant="body2">
              {result?.shippingAddress?.legalName}
            </Typography>
            <Typography variant="body2">
              {getAddress(result?.shippingAddress)}
            </Typography>
            */}
            {/* <Typography variant="body2">
              {result?.client?.address?.shippingAddress?.mobileNumber},{" "}
              {result?.client?.address?.shippingAddress?.email}
            </Typography>
          </Box> */}
        </Grid>
      </Grid>
    </Box>
  );
}

export default AddressDetails;
