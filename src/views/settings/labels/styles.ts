import { styled } from "@mui/system";

export const StyledLabel = styled("div")<{ color: string }>(({ color }) => ({
  background: color,
  display: "inline-flex",
  borderRadius: "20px",
  padding: "4px 20px",
  color: "white",
  minWidth: 60,
  justifyContent: "center",
}));
