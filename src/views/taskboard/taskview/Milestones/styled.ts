import { styled } from "@mui/material";

export const StyledChecklistHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  marginLeft: "-8px",
  gap: 12,
  "& div": {
    width: 20,
    height: 20,
    border: "1px solid #F2353C",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
  },
}));

export const StyledChecklistContainer = styled("div")(() => ({
  marginTop: 20,
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: 4,
  "& header": {
    borderBottom: "1px solid rgba(0,0,0,0.2)",
    minHeight: 30,
    padding: "10px",
    cursor: "pointer",
  },
  "& main": {
    height: 400,
    overflowY: "auto",
    padding: "10px 20px",
  },
}));

export const StyledChecklistItem = styled("div")<{ index: number }>(
  ({ index }) => {
    return {
      position: "relative",
      alignItems: "center",
      display: "flex",
      maxWidth: "500px",
      paddingLeft: 45,
      gap: 1,
      "&:before": {
        content: '""',
        position: "absolute",
        left: 0,
        width: "40px",
        height: "1px",
        borderTop: "1px dashed rgba(242, 53, 60,0.5)",
        top: "50%",
      },
      "&:after": {
        content: '""',
        position: "absolute",
        left: 0,
        bottom: "50%",
        width: "1px",
        height: index === 0 ? "50%" : "100%",
        borderLeft: "1px dashed rgba(242, 53, 60,0.5)",
      },
    };
  }
);
