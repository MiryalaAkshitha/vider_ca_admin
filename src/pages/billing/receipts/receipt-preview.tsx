import { DownloadOutlined } from "@mui/icons-material";
import { Grid, Typography, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { downloadReceipt, getReceiptPreview } from "api/services/billing/receipts";
import Loader from "components/Loader";
import { snack } from "components/toast";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import AddressDetails from "views/billing/estimates/EstimatePreview/AddressDetails";
import SectionHeading from "views/billing/estimates/SectionHeading";
import BasicDetails from "views/billing/invoices/ReceiptPreview/BasicDetails";
import InvoiceDetails from "views/billing/invoices/ReceiptPreview/InvoiceDetails";
import PaymentDetails from "views/billing/invoices/ReceiptPreview/PaymentDetails";

export const StyledWatupButton = styled("div")(() => ({
  position: "absolute",
  // width: "40px",
  height: "50px",
  bottom: "30px",
  right: "220px",
  top: "100px",
  zIndex: 100,
  cursor: "pointer"
}));

const ReceiptPreview = () => {
  const params = useParams();
  const { queryParams } = useQueryParams();
  const [isdownloading, setIsdownloading] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["receipt-particular", params.receiptId],
    getReceiptPreview
  );

  const result = data?.data;

  const shareOnWhatsApp = () => {
    const url = 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf';
    const phoneNumber = '91' + data?.data?.billingEntity?.mobileNumber || "9181211 81212";
    const message = encodeURIComponent("Check out this repecipt: " + url);
    let params = `scrollbars=no,resizable=no,status=no,location=no,toolbar=no,menubar=no,
width=0,height=0,left=-1000,top=-1000`;
    window.open(`https://api.whatsapp.com/send?phone=${phoneNumber}&text=${message}&attachment=${url}`, "", params);
  }

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

  if (isLoading) return <Loader />;

  return (
    <Box py={2}>
      <Paper
        sx={{
          maxWidth: 1200,
          margin: "auto",
          p: 2,
          ...(queryParams.fromApi && {
            boxShadow: "none",
          }),
        }}
      >
        <BasicDetails result={result} />
        <AddressDetails result={result} />

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <PaymentDetails result={result} />
          </Grid>
          <Grid item xs={6}>
            <InvoiceDetails result={result} />
          </Grid>
        </Grid>

        {/* <Box sx={{ pageBreakAfter: "always" }}></Box> */}

        <Box mt={2}>
          <SectionHeading title="Terms & Conditions" />
          <Box p={1}>
            {result?.termsAndConditions?.map((item: any, index: number) => (
              <Typography mt={1} key={index} variant="body2">
                {index + 1}. {item}
              </Typography>
            ))}
          </Box>
        </Box>

        {/* <StyledWatupButton id="downloadIcon" className="hide">

          {isdownloading ? 'downloading...' : <DownloadOutlined onClick={handleDownload} />}

          <img onClick={shareOnWhatsApp} src="https://vider.in/images/e-whatsapp.jpg" title="watsup"
            style={{ 'width': '40px', 'cursor': 'pointer' }} /> 

        </StyledWatupButton> */}

      </Paper>
    </Box>
  );
};

export default ReceiptPreview;
