import { styled } from "@mui/styles";
import { Card, Typography, IconButton } from "@mui/material";

const baseStyles = {
  fontStyle: "normal",
  fontVariant: "normal",
  fontFamily: "muli_regular",
  color: "#222222",
};

export const StyledCard = styled(Card)(() => ({
  position: "relative",
  width: "31rem",
  height: "98px",
  margin: "1rem 0",
  boxShadow: "0px 5px 20px #182F531A",
}));

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
  right: "0",
  top: "0",
}));
