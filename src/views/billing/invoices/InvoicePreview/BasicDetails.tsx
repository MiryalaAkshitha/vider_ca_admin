import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { logo } from "assets";
import { getTitle } from "utils";
import { formattedDate } from "utils/formattedDate";
import SectionHeading from "views/billing/estimates/SectionHeading";

function BasicDetails({ result }) {
  return (
    <Box>
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={6}>
          <Box mb={3}>
            <Typography color="#0D46A0" variant="h5">
              INVOICE
            </Typography>
            <Typography variant="body2">
              Invoice To : {result?.client?.displayName}
            </Typography>
          </Box>
          <SectionHeading title="Billed By" />
          <Box p={1}>
            {/* <Box mb={1}>
              <img src={logo} alt="" />
            </Box> */}
            <Typography variant="body2">
            {result?.billingEntity?.legalName}
            </Typography>
            <Typography variant="body2">
            {result?.billingEntity?.buildingName},
            {result?.billingEntity?.street},
            {result?.billingEntity?.city},
            {result?.billingEntity?.state},
            {result?.billingEntity?.pincode},
              {/* 2/91/20, BP Raju Marg, Laxmi Cyber City, Whitefields, Kondapur,
              Telangana 500081 */}
            </Typography>
            <Typography variant="body2">
            Mobile:{result?.billingEntity?.mobileNumber},
            Email: {result?.billingEntity?.email},
            Website: {result?.billingEntity?.website}
              {/* 9947368386, Viderbusiness@gmail.com */}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={6} sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Box maxWidth={400}>
            {/* <Box textAlign="center">
              <img
                style={{ width: 140, margin: "auto" }}
                src="https://vider.in/wp-content/uploads/2020/09/image.png"
                alt=""
              />
            </Box> */}
            <Box mt={1}>
              <Typography variant="subtitle1" mb={1} color="#0D46A0">
                #{result?.invoiceNumber}
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2">Invoice Date</Typography>
                    <span>:</span>
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">
                    {formattedDate(result?.invoiceDate)}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2">Terms</Typography>
                    <span>:</span>
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">
                    {getTitle(result?.terms?.toLowerCase())}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography variant="body2">Due Date</Typography>
                    <span>:</span>
                  </Box>
                </Grid>
                <Grid item xs={8}>
                  <Typography variant="body2">
                    {formattedDate(result?.invoiceDueDate)}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default BasicDetails;
