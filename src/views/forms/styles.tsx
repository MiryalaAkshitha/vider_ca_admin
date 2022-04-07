import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/styles";

const baseStyles = {
  fontStyle: "normal",
  fontVariant: "normal",
  fontFamily: "muli_regular",
  color: "#222222",
};

export const FormBoldText = styled(Typography)(() => ({
  ...baseStyles,
  fontWeight: "800",
  fontSize: "18px",
  letterSpacing: "0px",
  lineHeight: "23px",
}));

export const FromNormalText = styled(Typography)(() => ({
  ...baseStyles,
  fontWeight: "300",
  letterSpacing: "0px",
}));

export const ClientFormBoldText = styled(Typography)(() => ({
  ...baseStyles,
  fontWeight: "600",
  fontSize: "14px",
  lineHeight: "12px",
}));

export const ClientFormNormalText = styled(Typography)(() => ({
  ...baseStyles,
  fontWeight: 400,
  fontSize: "9px",
  lineHeight: "12px",
  paddingTop: "10px",
}));

export const StyledMoreIcon = styled(IconButton)(() => ({
  position: "absolute",
  right: 10,
  top: 10,
}));

export const StyledCard = styled(Box)(() => ({
  boxShadow: "0px 3px 12px #0000001A",
  borderRadius: 10,
  padding: 15,
  cursor: "pointer",
  position: "relative",
}));
