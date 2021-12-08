import { styled } from "@mui/material/styles";

export const StyledTable = styled("table")(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  background: "#FFFFFF",
  fontFamily: "muli_regular",
  paddingBottom: "30px",
  "& thead": {
    background: "#182F53",
  },
  "& tr": {
    cursor: "pointer",
  },
  "& th": {
    color: "white",
    fontFamily: "muli_regular",
    fontSize: 14,
    padding: "15px 10px",
    textAlign: "left",
  },
  "& td": {
    textAlign: "left",
    padding: "15px",
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
