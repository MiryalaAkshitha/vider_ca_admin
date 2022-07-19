import ClearIcon from "@mui/icons-material/Clear";
import { Grid, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import {
  handleAddOtherParticular,
  handleChangeOtherParticular,
  handleRemoveOtherParticular,
  selectInvoice,
} from "redux/reducers/createInvoiceSlice";
import { InvoiceCalculations } from "../calculations";
import TotalCalculations from "./TotalCalculations";

function OtherParticulars() {
  const dispatch = useDispatch();
  const state = useSelector(selectInvoice);

  let iCalcs = new InvoiceCalculations(state);

  function updateOtherParticular(index, key, value) {
    dispatch(
      handleChangeOtherParticular({
        index,
        key,
        value,
      })
    );
  }

  function addOtherParticular() {
    dispatch(handleAddOtherParticular());
  }

  function removeOtherParticular(index) {
    dispatch(handleRemoveOtherParticular(index));
  }

  return (
    <Grid
      container
      sx={{
        margin: "30px 0",
      }}
      justifyContent="space-between"
    >
      <Grid item xs={6}>
        <Table sx={{ tableLayout: "fixed", width: "100%" }}>
          <TableHead
            sx={{
              backgroundColor: "#0D47A1",
              "& th": { color: "white" },
            }}
          >
            <TableRow>
              <TableCell>
                <Typography>Services as a Pure Agent</Typography>
              </TableCell>

              <TableCell>
                <Typography>Amount</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.otherParticulars.map((data, index) => {
              return (
                <TableRow
                  key={index}
                  sx={{
                    "& .MuiTableCell-root": { border: "1px solid #e0e0e0" },
                  }}
                >
                  <TableCell>
                    <TextField
                      variant="standard"
                      type="text"
                      placeholder="Services as a Pure Agent"
                      value={data.name}
                      onChange={(e) => {
                        updateOtherParticular(index, "name", e.target.value);
                      }}
                    />
                  </TableCell>

                  <TableCell
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      placeholder="Enter Amount"
                      variant="standard"
                      type="number"
                      value={data.amount}
                      onChange={(e) => {
                        updateOtherParticular(index, "amount", +e.target.value);
                      }}
                    />
                    <ClearIcon
                      sx={{
                        fontSize: "18px",
                        color: "#F2353C",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        removeOtherParticular(index);
                      }}
                    />
                  </TableCell>
                </TableRow>
              );
            })}
            <TableRow
              sx={{
                "& .MuiTableCell-root": { border: "1px solid #e0e0e0" },
              }}
            >
              <TableCell colSpan={1} sx={{ border: "none !important" }}>
                <Typography
                  onClick={addOtherParticular}
                  sx={{ color: "#F2353C", cursor: "pointer" }}
                >
                  + Add New
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="body2">Total Amount</Typography>
                <Typography variant="subtitle2">
                  {iCalcs.additionalCharges()} /-
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Grid>
      <Grid item xs={4}>
        <TotalCalculations />
      </Grid>
    </Grid>
  );
}

export default OtherParticulars;
