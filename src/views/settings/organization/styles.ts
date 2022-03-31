import { styled } from "@mui/system";

export const StyledAttachment = styled("div")(() => ({
  display: "flex",
  gap: "4px",
  background: "#F8F8F8",
  padding: "10px 20px",
  maxWidth: 400,
  border: "1px solid #D1D1D1",
  borderRadius: 8,
  justifyContent: "space-between",
  "& a": {
    textDecoration: "none",
  },
}));
