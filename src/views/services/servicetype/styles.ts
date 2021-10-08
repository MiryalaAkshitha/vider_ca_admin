import { styled } from "@mui/material/styles";

export const CustomTable = styled("table")(({ theme }) => ({
  width: "100%",
  boxShadow: "0px 5px 15px #22222214",
  borderCollapse: "collapse",
  marginTop: 20,
  "& tbody tr:nth-child(odd)": {
    backgroundColor: "#F7F7F7",
  },
  "& th, & td": {
    padding: "10px 30px",
    border: `1px solid rgba(0,0,0,0.1)`,
    textAlign: "left",
  },
}));
