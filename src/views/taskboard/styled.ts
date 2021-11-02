import { styled } from "@mui/material/styles";

export const StyledDraggableList = styled("div")<{
  isDraggingOver: boolean;
}>(({ isDraggingOver }) => ({
  width: "100%",
  border: isDraggingOver
    ? "1px dashed rgba(0,0,0,0.2)"
    : "1px dashed transparent",
  padding: "10px",
  height: "100%",
}));

export const StyledDraggableItem = styled("div")<{
  isDragging: boolean;
  draggableStyle: any;
}>(({ isDragging, theme, draggableStyle }) => ({
  userSelect: "none",
  marginBottom: "15px",
  minHeight: "100px",
  border: `1px solid ${
    isDragging ? theme.palette.primary.main : "rgba(0,0,0,0.1)"
  }`,
  borderRadius: "10px",
  background: isDragging ? theme.palette.primary.light : "rgba(0,0,0,0.03)",
  cursor: "pointer",
  boxShadow: "0px 3px 15px #273b8014",
  ...draggableStyle,
}));
