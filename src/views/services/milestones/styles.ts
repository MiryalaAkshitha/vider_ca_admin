import { styled } from "@mui/material/styles";

export const StyledChecklistItem = styled("div")<{ cIndex: number }>(
  ({ cIndex }) => {
    return {
      position: "relative",
      padding: "10px 0px",
      alignItems: "center",
      display: "flex",
      maxWidth: "500px",
      gap: 1,
      "&:before": {
        content: '""',
        position: "absolute",
        left: 0,
        width: "40px",
        height: "1px",
        background: "lightgrey",
        top: "50%",
      },
      "&:after": {
        content: '""',
        position: "absolute",
        left: 0,
        bottom: "50%",
        width: "1px",
        height: cIndex === 0 ? "50%" : "100%",
        background: "lightgrey",
      },
    };
  }
);

export const StyledDraggableMilestone = styled("div")<{ opacity: number }>(
  ({ opacity }) => ({
    display: "flex",
    alignItems: "center",
    gap: "5px",
    border: "1px dashed gray",
    padding: "0.5rem 1rem",
    marginBottom: "15px",
    backgroundColor: "white",
    cursor: "move",
    opacity,
  })
);