import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import { Button } from "@mui/material";
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
  ...draggablestyle,
}));

export const StyledScrollTarget = styled("span")(() => ({
  display: "block",
  position: "absolute",
  marginTop: "-140px",
  paddingTop: "140px",
  visibility: "hidden",
}));

export const StyledDates = styled("div")<{ index: number }>(({ index }) => {
  return {
    position: "relative",
    padding: "15px 0px",
    gap: 1,
    "&:before": {
      content: '""',
      position: "absolute",
      left: 0,
      width: "30px",
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
      height: index === 0 ? "50%" : "100%",
      background: "lightgrey",
    },
  };
});

export const GreyButton = styled(Button)({
  backgroundColor: "rgba(0,0,0,0.1)",
  color: "black",
  "&:hover": {
    backgroundColor: "rgba(0,0,0,0.2)",
  },
});

export const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.text.secondary,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.text.secondary,
    borderTopRightRadius: theme.spacing(2),
    borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    "&.Mui-expanded": {
      fontWeight: theme.typography.fontWeightRegular,
    },
    "&:hover": {
      backgroundColor: theme.palette.action.hover,
    },
    "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
      color: "var(--tree-view-color)",
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: "inherit",
      color: "inherit",
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(2),
    },
  },
}));

export const StyledSubTaskTable = styled("table")({
  width: "100%",
  borderCollapse: "collapse",
  background: "#FFFFFF",
  fontFamily: "muli_regular",
  paddingBottom: "30px",
  tableLayout: "fixed",
  "& tr": {
    cursor: "pointer",
  },
  "& th": {
    padding: "15px 10px",
    textAlign: "left",
  },
  "& td": {
    textAlign: "left",
    padding: "15px",
  },
  "& tbody tr:not(:last-child)": {
    borderBottom: "1px solid #e0e0e0",
  },
});
