import { Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

export const FlexBoxForTaskMetricsFilters = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "20px",
}));
export const FlexBoxForClientAnalytics = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  marginBottom: "20px",
}));

export const Typography13 = styled(Typography)(() => ({
  opacity: "50%",
  fontSize: "13px",
  lineHeight: "16px",
}));
