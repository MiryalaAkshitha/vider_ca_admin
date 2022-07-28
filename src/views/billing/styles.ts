import { ListItemButton, Menu, Tab, Table } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StyledListItemButton = styled(ListItemButton)({
  "&.MuiListItemButton-root": {
    textAlign: "left",
    minHeight: "48px",
  },
});

export const StyledListItem = styled(ListItemButton)({
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
});

export const StyledTab = styled(Tab)({
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
});

export const MenuItem = styled("div")({
  display: "flex",
});

export const StyledNewEstimateContainer = styled("div")({
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: 1400,
  margin: "0 auto",
  padding: "30px 20px",
});

export const StyledParticularsTable = styled(Table)({
  width: "100%",
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

export const StyledActionsMenu = styled(Menu)(({ theme }) => ({
  "& .MuiMenuItem-root": {
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: 14,
  },
  "& .MuiMenuItem-root:not(:last-child)": {
    borderBottom: "1px solid #ddd4d4",
  },
  "& .MuiSvgIcon-root": {
    fontSize: 20,
    marginRight: 10,
    color: theme.palette.primary.main,
  },
}));
