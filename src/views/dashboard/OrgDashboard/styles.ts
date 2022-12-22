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

export const StyledTaskBox = styled(Box)({
  borderRadius: "10px",
  border: "1px solid #0000001A",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  "& header": {
    background: "rgba(0, 0, 0, 0.06)",
    padding: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  "& footer": {
    borderTop: "1px solid #0000001A",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    alignItems: "center",
  },
  "& main": {
    padding: "10px",
    flex: 1,
    overflowY: "auto",
  },
});
