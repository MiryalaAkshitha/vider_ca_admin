import { Grid, Typography, styled } from "@mui/material";
import { Box } from "@mui/system";
import { downloadReceipt } from "api/services/billing/receipts";
import { logo } from "assets";
import { useState } from "react";
import { useMutation } from "react-query";
import { getTitle } from "utils";
import { formattedDate } from "utils/formattedDate";
import { AddressDetail } from "views/billing/estimates/AddEstimate/BillingEntityDetails";
import { getAddress } from "views/billing/estimates/EditEstimate/BillingEntityDetails";
import SectionHeading from "views/billing/estimates/SectionHeading";
import { handleError } from "utils/handleError";
import { snack } from "components/toast";
import { useParams } from "react-router-dom";
import useQueryParams from "hooks/useQueryParams";
import { DownloadOutlined } from "@mui/icons-material";

export const StyledDownloadButton = styled("div")(() => ({
  width: "80px",
  height: "50px",
  zIndex: 100,
  cursor: "pointer",
  float: "right",
  fontSize: "10px"
}));

function BasicDetails({ result }) {
  const params = useParams();
  
  const [isdownloading, setIsdownloading] = useState(false);

  const { mutate } = useMutation(downloadReceipt, {
    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], { type: "application/pdf" });
      const pdf = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = pdf;
      link.download = "receipt.pdf";
      link.click();
      setIsdownloading(false);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleDownload = () => {
    setIsdownloading(true);
    mutate({ id: params.receiptId });
  };

  return (
    <Box>
      <Grid container spacing={3} justifyContent="space-between">
        <Grid item xs={6}>
          <Box mb={3}>
            <Typography color="#0D46A0" variant="h5">
              TAX RECEIPT
            </Typography>
            <Typography variant="body2">
              Receipt To : {result?.client?.displayName}
            </Typography>
          </Box>
          <SectionHeading title="Billed By" />
          <Box p={1}>
            {/* <Box mb={1}>
              <img src={logo} alt="" />
            </Box> */}
            <AddressDetail
              title="Legal Name"
              value={result?.billingEntity?.legalName}
            />
            <AddressDetail
              title="Address"
              value={getAddress(result?.billingEntity)}
            />
            <Typography variant="body2">
              <AddressDetail
                title="Email"
                value={result?.billingEntity?.email}
              />
              <AddressDetail
                title="Mobile Number"
                value={result?.billingEntity?.mobileNumber}
              />
              {/* <Typography variant="body2">
                {result?.billingEntity?.legalName}
              </Typography> */}
              <AddressDetail
                title="GST Number"
                value={result?.billingEntity?.gstNumber}
              />
              <AddressDetail
                title="Place Of Supply"
                value={result?.placeOfSupply}
              />
              {/* <Typography variant="body2">
            {result?.billingEntity?.buildingName},
            {result?.billingEntity?.street},
            {result?.billingEntity?.city},
            {result?.billingEntity?.state},
            {result?.billingEntity?.pincode},
              {/* 2/91/20, BP Raju Marg, Laxmi Cyber City, Whitefields, Kondapur,
              Telangana 500081 */}

              {/* {result?.billingEntity?.mobileNumber}, {result?.billingEntity?.email}, */}
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
            <Box mt={5}>
              <Typography variant="subtitle1" mb={1} color="#0D46A0">
                <StyledDownloadButton id="downloadIcon" className="hide">
                  {isdownloading ? 'downloading...' : <DownloadOutlined onClick={handleDownload} />}
                </StyledDownloadButton>
                {/* #{result?.invoiceNumber} */}
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
    </Box >
  );
}

export default BasicDetails;