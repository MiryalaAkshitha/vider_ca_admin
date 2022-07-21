import { ListItemButton, Tab, Table } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  "&.MuiListItemButton-root": {
    textAlign: "left",
    minHeight: "48px",
  },
}));

export const StyledListItem = styled(ListItemButton)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    minHeight: "auto",
    padding: "10px 0",
    display: "flex",
    alignItems: "flex-start",
    textTransform: "capitalize",
    paddingLeft: "20px",
    width: "100%",
    opacity: "1",
  },
}));
export const StyledTab = styled(Tab)(({ theme }) => ({
  "&.MuiButtonBase-root": {
    minHeight: "auto",
    padding: "10px 0",
    display: "flex",
    alignItems: "flex-start",
    textTransform: "capitalize",
    paddingLeft: "20px",
    width: "100%",
    flexDirection: "column",
    opacity: "1",
  },
}));

export const MenuItem = styled("div")(({ theme }) => ({
  display: "flex",
}));

export const StyledNewEstimateContainer = styled("div")({
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: 1400,
  margin: "0 auto",
  padding: "30px 20px",
});

export const StyledParticularsTable = styled(Table)({
  tableLayout: "fixed",
  emptyCells: "hide",
  "& .MuiTableCell-root": {
    border: "1px solid #e0e0e0",
  },
  "& th": {
    color: "white",
  },
  "& .MuiTableHead-root": {
    backgroundColor: "#0D47A1",
  },
  "& .MuiTableHead-root  .MuiTableCell-root": {
    border: "none",
  },
});
