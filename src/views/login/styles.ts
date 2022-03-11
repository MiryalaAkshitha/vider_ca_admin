import { styled } from "@mui/material/styles";

export const BackgroundImage = styled("div")(() => ({
  background: "rgba(24, 47, 83, 0.9)",
  position: "relative",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const LogoContainer = styled("div")(() => ({
  maxWidth: 400,
  margin: "auto",
  padding: "10px",
  textAlign: "center",
  "& img": {
    maxWidth: "100%",
  },
}));
