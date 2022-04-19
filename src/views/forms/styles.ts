import { Box, IconButton, styled } from "@mui/material";

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

export const StyledField = styled("div")<{
  isdragging?: 0 | 1;
}>(({ isdragging }) => ({
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: `1px solid ${isdragging ? "#00B8D4" : "#E0E0E0"}`,
  borderRadius: "5px",
  alignItems: "center",
  display: "flex",
  gap: 10,
  padding: "15px 20px",
  minHeight: "30px",
  cursor: "pointer",
  ...(!isdragging && {
    transform: "none !important",
  }),
}));

export const DummyStyledField = styled("div")(() => ({
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  border: `1px solid #E0E0E0`,
  borderRadius: "5px",
  alignItems: "center",
  display: "flex",
  gap: 10,
  padding: "15px 20px",
  minHeight: "30px",
  cursor: "pointer",
}));
