import { styled } from "@mui/material";

export const StyledServicesContainer = styled("div")(() => ({
  height: 400,
  overflow: "auto",
  margin: "10px -10px 0px -10px",
  padding: "10px",
}));

export const StyledServiceItem = styled("div")(() => ({
  height: "100%",
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: 10,
  marginBottom: "10px",
  padding: "10px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  gap: 10,
  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
}));

export const StyledServiceDesc = styled("div")(() => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  lineClamp: 2,
  WebkitBoxOrient: "vertical",
}));

export const StyledSelectBox = styled("div")({
  border: "1px dashed rgba(0,0,0,0.3)",
  borderRadius: 5,
  padding: 10,
  height: 100,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  marginTop: 20,
});

export const StyledSelectedBox = styled("div")({
  border: "1px solid rgba(0,0,0,0.4)",
  borderRadius: 5,
  padding: "5px 10px",
  marginTop: 10,
  display: "flex",
  justifyContent: "space-between",
  gap: 20,
  alignItems: "center",
});
