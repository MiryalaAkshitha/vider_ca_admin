import { CSSObject, styled, Theme } from "@mui/material/styles";

export const StyledTable = styled("table")(({ theme }) => ({
  width: "100%",
  borderCollapse: "collapse",
  boxShadow: "0px 5px 15px #22222214",
  borderRadius: "10px",
  background: "#FFFFFF 0% 0% no-repeat padding-box",
  fontFamily: "muli_regular",
  "& th": {
    color: "grey",
    fontFamily: "muli_regular",
    fontSize: 14,
  },
  "& td, & th": {
    padding: "10px",
    textAlign: "left",
  },
  "& tbody tr:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
}));
