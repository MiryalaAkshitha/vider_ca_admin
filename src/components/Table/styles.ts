import { styled } from "@mui/material/styles";

export const StyledTableContainer = styled("div")({
  position: "relative",
  boxShadow: "0px 0px 15px rgb(0 0 0 / 10%)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  borderRadius: "6px",
  overflow: "hidden",
  border: "1px solid rgba(0, 0, 0, 0.09)",
});

export const StyledTable = styled("table")(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  background: "#FFFFFF",
  fontFamily: "muli_regular",
  paddingBottom: "30px",
  "& thead": {
    position: "sticky",
    top: 0,
    background: "white",
    zIndex: 2,
  },
  "& tr": {
    cursor: "pointer",
  },
  "& th": {
    color: "grey",
    fontFamily: "muli_regular",
    fontSize: 14,
    padding: "10px",
    textAlign: "left",
  },
  "& td": {
    textAlign: "left",
    padding: "10px",
  },
  "& tbody tr:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));

export const StyledTableLoader = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  background: "rgba(255,255,255, 0.4)",
  height: "100%",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));
