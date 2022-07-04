import { styled } from "@mui/system";

export const StyledChecklist = styled("div")(() => ({
  border: "1px solid rgba(0,0,0,0.2)",
  borderRadius: 6,
  overflow: "hidden",
  marginBottom: 20,
  "[contenteditable]": {
    padding: "5px 10px",
    "&:hover": {
      outline: "1px dashed rgba(0,0,0,0.3)",
    },
    "&:focus": {
      outline: "1px dashed rgba(0,0,0,0.3)",
    },
  },
  "& header": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "5px 10px 5px 10px",
  },
}));

export const StyledChecklistItem = styled("div")<{
  bgcolor: string;
}>(({ bgcolor }) => ({
  padding: "5px 10px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: bgcolor,
}));
