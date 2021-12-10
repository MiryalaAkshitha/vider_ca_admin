import { styled } from "@mui/system";

export const UploadContainer = styled("div")(() => ({
  border: "1px dotted grey",
  display: "flex",
  borderRadius: "8px",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  minHeight: 150,
  textAlign: "center",
  cursor: "pointer",
  padding: 20,
}));

export const StyledFileChip = styled("div")(() => ({
  background: "rgba(0,0,0,0.2)",
  borderRadius: "2px",
  display: "flex",
  alignItems: "center",
  gap: 10,
  padding: "0.3rem 0.6rem",
}));
