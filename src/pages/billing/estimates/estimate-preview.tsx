import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";
import { getEstimate } from "api/services/billing/estimates";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddressDetails from "views/billing/estimates/EstimatePreview/AddressDetails";
import BankDetails from "views/billing/estimates/EstimatePreview/BankDetails";
import BasicDetails from "views/billing/estimates/EstimatePreview/BasicDetails";
import OtherParticulars from "views/billing/estimates/EstimatePreview/OtherParticulars";
import Particulars from "views/billing/estimates/EstimatePreview/Particulars";
import SectionHeading from "views/billing/estimates/SectionHeading";

const EstimatePreview = () => {
  const params = useParams();
  const { queryParams } = useQueryParams();

  const { data, isLoading }: ResType = useQuery(
    ["estimate-details", params.estimateId],
    getEstimate
  );

  const result = data?.data;

  const interState =
    result?.billingEntityAddress?.state === result?.placeOfSupply;

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
        <Particulars result={result} interState={interState} />
        <Box sx={{ pageBreakAfter: "always" }}></Box>
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
        <Box textAlign="center" mt={2}>
          <Typography variant="body2">
            For any enquiry, reach out via email :
            <span style={{ color: "#0D47A1" }}>viderbusiness@gmail.com</span>
            or call on
            <span style={{ color: "#0D47A1" }}> +91 81211 81212</span>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default EstimatePreview;
