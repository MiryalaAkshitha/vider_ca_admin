import { styled } from "@mui/material/styles";

export const StyledDraggableList = styled("div")<{
  isdraggingover: "true" | "false";
  height: string;
}>(({ isdraggingover, height }) => ({
  width: "100%",
  border:
    isdraggingover === "true"
      ? "1px dashed rgba(0,0,0,0.2)"
      : "1px dashed transparent",
  padding: "10px",
  height: height || "auto",
  overflowY: "auto",
}));

export const StyledDraggableItem = styled("div")<{
  isdragging: "true" | "false";
  draggablestyle: any;
}>(({ isdragging, theme, draggablestyle }) => ({
  userSelect: "none",
  marginBottom: "15px",
  minHeight: "100px",
  border: `1px solid ${
    isdragging === "true" ? theme.palette.primary.main : "rgba(0,0,0,0.1)"
  }`,
  borderRadius: "10px",
  background:
    isdragging === "true" ? theme.palette.primary.light : "rgba(0,0,0,0.03)",
  cursor: "pointer",
  boxShadow: "0px 3px 15px #273b8014",
  ...draggablestyle,
}));

export const StyledScrollTarget = styled("span")(() => ({
  display: "block",
  position: "absolute",
  marginTop: "-140px",
  paddingTop: "140px",
  visibility: "hidden",
}));
