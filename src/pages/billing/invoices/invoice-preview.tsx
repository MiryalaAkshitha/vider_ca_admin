import { DownloadOutlined } from "@mui/icons-material";
import { Typography, styled } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { downloadInvoice, getInvoicePreview } from "api/services/billing/invoices";
// import { downloadReceipt } from "api/services/billing/receipts";
import Loader from "components/Loader";
import { snack } from "components/toast";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import AddressDetails from "views/billing/estimates/EstimatePreview/AddressDetails";
import BankDetails from "views/billing/estimates/EstimatePreview/BankDetails";
import OtherParticulars from "views/billing/estimates/EstimatePreview/OtherParticulars";
import Particulars from "views/billing/estimates/EstimatePreview/Particulars";
import SectionHeading from "views/billing/estimates/SectionHeading";
import BasicDetails from "views/billing/invoices/InvoicePreview/BasicDetails";

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

const InvoicePreview = () => {
  const params = useParams();
  const { queryParams } = useQueryParams();
  const [isdownloading, setIsdownloading] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["invoice-details", params.invoiceId],
    getInvoicePreview
  );

  const result = data?.data;

  const interState =
    result?.billingEntityAddress?.state === result?.placeOfSupply;

  const { mutate } = useMutation(downloadInvoice, {
    onSuccess: (res: any) => {
      const arr = new Uint8Array(res.data?.data);
      const blob = new Blob([arr], { type: "application/pdf" });
      const pdf = window.URL.createObjectURL(blob);
      let link = document.createElement("a");
      link.href = pdf;
      link.download = "invoice.pdf";
      link.click();
      setIsdownloading(false);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleDownload = () => {
    setIsdownloading(true);
    mutate({ id: params.invoiceId });
  };

  // if (isLoading) return <Loader />;
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
        <StyledWatupButton>

          {isdownloading ? 'downloading...' : <DownloadOutlined onClick={handleDownload} />}

          {/* <img onClick={shareOnWhatsApp} src="https://vider.in/images/e-whatsapp.jpg" title="watsup"
  style={{ 'width': '40px', 'cursor': 'pointer' }} /> */}

        </StyledWatupButton>
        <BasicDetails result={result} />
        <AddressDetails result={result} />
        <Particulars result={result} interState={interState} />
        {/* <Box sx={{ pageBreakAfter: "always" }}></Box> */}
        <OtherParticulars result={result} interState={interState} />
        <BankDetails result={result} />
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

      </Paper>
    </Box>
  );
};

export default InvoicePreview;