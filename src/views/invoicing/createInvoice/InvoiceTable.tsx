import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Box } from "@mui/system";

import SelectTaskDialog from "./SelectTaskDialog";

const headings = [
  "Particulars (Task / Service name)",
  "HSN / SAC",
  "Units",
  "Rate",
  "Discount",
  "Taxable Value",
  "IGST",
  "Amount",
];

const rowsData = [
  {
    particulars: "GST Registration",
    HSN: "498237",
    units: "1",
    rate: "20000",
    discount: "24",
    taxableValue: "20000",
    IGST: "1000",
    amount: "20390",
  },
  {
    particulars: "TDS",
    HSN: "3424",
    units: "1",
    rate: "20000",
    discount: "24",
    taxableValue: "20000",
    IGST: "1000",
    amount: "20390",
  },
  {
    particulars: "",
    HSN: "",
    units: "",
    rate: "",
    discount: "",
    taxableValue: "",
    IGST: "",
    amount: "",
  },
];

export default function InvoiceTable() {
  const [tableData, setTableData] = useState(rowsData);
  const [tableData2, setTableData2] = useState([
    ...tableData.map((data) => {
      return { particulars: data.particulars, amount: 0 };
    }),
  ]);
  const [openDialog, setOpenDialog] = useState(false);
  const [checkTDS, setCheckTDS] = useState(true);
  const [checkAdditionalCharges, setCheckAdditionalCharges] = useState(true);

  //Table 1 Opertations

  function handleArrayUpdate(index, updatedData) {
    const tempArr = [...tableData];
    tempArr[index][updatedData.key] = updatedData.value;
    setTableData(tempArr);
  }

  function handleAddNewRow(newData: any[]) {
    if (newData.length === 0) {
      const tempArr = [...tableData];
      tempArr.push({
        particulars: "",
        HSN: "",
        units: "",
        rate: "",
        discount: "",
        taxableValue: "",
        IGST: "",
        amount: "",
      });
      setTableData(tempArr);
    } else {
      const tempArr = [...tableData];
      let rowsToAdd = newData.map((value, index) => {
        return {
          particulars: value,
          HSN: "",
          units: "",
          rate: "",
          discount: "",
          taxableValue: "",
          IGST: "",
          amount: "",
        };
      });
      tempArr.push(...rowsToAdd);
      setTableData(tempArr);
    }
  }

  function handleRemoveRow(index) {
    const tempArr = [...tableData];
    tempArr.splice(index, 1);
    setTableData(tempArr);
  }

  //Table 2 Opertations

  function handleArrayUpdate2(index, updatedData) {
    const tempArr = [...tableData2];
    tempArr[index][updatedData.key] = updatedData.value;
    setTableData2(tempArr);
  }

  function handleAddNewRowToTable2() {
    const tempArr = [...tableData2];
    tempArr.push({
      particulars: "",
      amount: 0,
    });
    setTableData2(tempArr);
  }

  function handleRemoveRow2(index) {
    const tempArr = [...tableData2];
    tempArr.splice(index, 1);
    setTableData2(tempArr);
  }

  // Open Select Task Dialog
  function handleOpenSelectTaskDialog() {
    setOpenDialog(true);
  }

  return (
    <>
      <SelectTaskDialog open={openDialog} setOpen={setOpenDialog} addTask={handleAddNewRow} />
      <TableContainer>
        <Table sx={{ tableLayout: "fixed", emptyCells: "hide" }}>
          <TableHead
            sx={{
              backgroundColor: "#0D47A1",
              "& th": { color: "white" },
            }}
          >
            <TableRow sx={{ border: "1px solid gray" }}>
              {headings.map((row, index) => {
                return (
                  <TableCell key={index} style={{ width: index === 0 ? "320px" : "auto" }}>
                    <Typography sx={{ fontWeight: "bold" }}>{row}</Typography>
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow
                key={index}
                sx={{
                  "& .MuiTableCell-root": {
                    border: "1px solid #e0e0e0",
                  },
                }}
              >
                <TableCell>
                  <Typography component="div">
                    <TextField
                      fullWidth
                      id="particulars"
                      label="Enter Item name"
                      variant="standard"
                      value={row.particulars}
                      onChange={(e) => {
                        handleArrayUpdate(e.currentTarget.getAttribute("data-index"), {
                          key: "particulars",
                          value: e.target.value,
                        });
                      }}
                      inputProps={{ "data-index": index }}
                    />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="div">
                    <TextField
                      fullWidth
                      type={"number"}
                      id="HSN"
                      label="Enter"
                      variant="standard"
                      value={row.HSN}
                      onChange={(e) =>
                        handleArrayUpdate(e.currentTarget.getAttribute("data-index"), {
                          key: "HSN",
                          value: e.target.value,
                        })
                      }
                      inputProps={{ "data-index": index }}
                    />
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography component="div">
                    <TextField
                      fullWidth
                      type={"number"}
                      id="units"
                      label="Enter"
                      variant="standard"
                      value={row.units}
                      onChange={(e) =>
                        handleArrayUpdate(e.currentTarget.getAttribute("data-index"), {
                          key: "units",
                          value: e.target.value,
                        })
                      }
                      inputProps={{ "data-index": index }}
                    />
                  </Typography>
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type={"number"}
                    id="rate"
                    label="Enter"
                    variant="standard"
                    value={row.rate}
                    onChange={(e) =>
                      handleArrayUpdate(e.currentTarget.getAttribute("data-index"), {
                        key: "rate",
                        value: e.target.value,
                      })
                    }
                    inputProps={{ "data-index": index }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type={"number"}
                    id="discount"
                    label="Enter"
                    variant="standard"
                    value={row.discount}
                    onChange={(e) =>
                      handleArrayUpdate(e.currentTarget.getAttribute("data-index"), {
                        key: "discount",
                        value: e.target.value,
                      })
                    }
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                    inputProps={{ "data-index": index }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type={"number"}
                    id="taxableValue"
                    label="Enter"
                    variant="standard"
                    value={row.taxableValue}
                    onChange={(e) =>
                      handleArrayUpdate(e.currentTarget.getAttribute("data-index"), {
                        key: "taxableValue",
                        value: e.target.value,
                      })
                    }
                    inputProps={{ "data-index": index }}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    type={"number"}
                    id="IGST"
                    label="Enter"
                    variant="standard"
                    value={row.IGST}
                    onChange={(e) =>
                      handleArrayUpdate(e.currentTarget.getAttribute("data-index"), {
                        key: "IGST",
                        value: e.target.value,
                      })
                    }
                    InputProps={{
                      startAdornment: <InputAdornment position="start">%</InputAdornment>,
                    }}
                    inputProps={{ "data-index": index }}
                  />
                </TableCell>
                <TableCell
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <TextField
                    fullWidth
                    type={"number"}
                    id="amount"
                    label="Enter"
                    variant="standard"
                    value={row.amount}
                    onChange={(e) =>
                      handleArrayUpdate(e.currentTarget.getAttribute("data-index"), {
                        key: "amount",
                        value: e.target.value,
                      })
                    }
                    inputProps={{ "data-index": index }}
                  />
                  <ClearIcon
                    sx={{ fontSize: "18px", color: "#F2353C", cursor: "pointer" }}
                    onClick={() => {
                      handleRemoveRow(index);
                    }}
                  />
                </TableCell>
              </TableRow>
            ))}

            <TableRow
              sx={{
                "& .MuiTableCell-root": { border: "1px solid #e0e0e0" },
              }}
            >
              <TableCell
                sx={{ border: "none !important", display: "flex", justifyContent: "space-between" }}
              >
                <Typography
                  onClick={() => handleAddNewRow([])}
                  sx={{ color: "#F2353C", cursor: "pointer" }}
                >
                  + Add New Item
                </Typography>
                <Typography
                  onClick={handleOpenSelectTaskDialog}
                  sx={{ color: "#F2353C", cursor: "pointer" }}
                >
                  + Select Task
                </Typography>
              </TableCell>
              <TableCell sx={{ border: "none !important" }}></TableCell>
              <TableCell sx={{ border: "none !important" }}></TableCell>
              <TableCell sx={{ border: "none !important" }}></TableCell>
              <TableCell sx={{ border: "none !important" }}></TableCell>
              <TableCell>
                <Typography component="div">
                  <span>Total Taxable Value:</span> <br />
                  <span>40,000 /-</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component="div">
                  <span>Total IGST:</span> <br />
                  <span>40,000 /-</span>
                </Typography>
              </TableCell>
              <TableCell>
                <Typography component="div">
                  <span>Total Amount:</span> <br />
                  <span>40,000 /-</span>
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Grid
        container
        sx={{
          margin: "30px 0",
        }}
        justifyContent="space-between"
      >
        <Grid item xs={4}>
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
              {tableData2.map((data, index) => {
                return (
                  <TableRow
                    key={index}
                    sx={{
                      "& .MuiTableCell-root": { border: "1px solid #e0e0e0" },
                    }}
                  >
                    <TableCell>
                      <Typography component="div">
                        <TextField
                          variant="standard"
                          type="text"
                          label="Enter service name"
                          value={data.particulars}
                          onChange={(e) =>
                            handleArrayUpdate2(e.currentTarget.getAttribute("data-index"), {
                              key: "particulars",
                              value: e.target.value,
                            })
                          }
                          inputProps={{ "data-index": index }}
                        />
                      </Typography>
                    </TableCell>
                    <TableCell
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography component="div">
                        <TextField
                          label="Enter Amount"
                          variant="standard"
                          type="number"
                          value={data.amount}
                          onChange={(e) =>
                            handleArrayUpdate2(e.currentTarget.getAttribute("data-index"), {
                              key: "amount",
                              value: e.target.value,
                            })
                          }
                          inputProps={{ "data-index": index }}
                        />
                      </Typography>
                      <ClearIcon
                        sx={{ fontSize: "18px", color: "#F2353C", cursor: "pointer" }}
                        onClick={() => {
                          handleRemoveRow2(index);
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
                <TableCell sx={{ border: "none !important" }}>
                  <Typography
                    onClick={handleAddNewRowToTable2}
                    sx={{ color: "#F2353C", cursor: "pointer" }}
                  >
                    + Add New
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography>
                    <span>Total Amount:</span> <br />
                    40,000 /-
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={4}>
          <Box
            sx={{
              backgroundColor: "#f3f5fa",
            }}
          >
            <Box
              sx={{ padding: "20px 30px", display: "flex", flexDirection: "column", rowGap: "6px" }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                    fontSize: "18px",
                  }}
                >
                  Sub Total<span>:</span>
                </Typography>
                <Typography
                  sx={{
                    flex: 1,
                    marginLeft: "20px",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  50,000 /-
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  + Pure Agent<span>:</span>
                </Typography>
                <Typography
                  sx={{
                    flex: 1,
                    marginLeft: "20px",
                  }}
                >
                  500.5 /-
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                  component="div"
                >
                  <span>
                    <FormGroup>
                      <FormControlLabel
                        sx={{
                          "&.MuiFormControlLabel-root": {
                            margin: "0",
                          },
                          "& .MuiCheckbox-root": {
                            marginRight: "5px",
                          },
                        }}
                        control={
                          <Checkbox
                            sx={{ padding: "0" }}
                            color="secondary"
                            onChange={(e) => {
                              setCheckTDS(!checkTDS);
                            }}
                            checked={checkTDS}
                          />
                        }
                        label="Add TDS"
                      />
                    </FormGroup>
                  </span>
                  <span>:</span>
                </Typography>
                <Typography
                  sx={{
                    flex: 1,
                    marginLeft: "20px",
                  }}
                  component="div"
                >
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="Enter TDS Amount"
                    disabled={!checkTDS}
                  />
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                  component="div"
                >
                  <span>
                    <FormGroup>
                      <FormControlLabel
                        sx={{
                          "&.MuiFormControlLabel-root": {
                            margin: "0",
                          },
                          "& .MuiCheckbox-root": {
                            marginRight: "5px",
                          },
                        }}
                        control={
                          <Checkbox
                            sx={{ padding: "0" }}
                            color="secondary"
                            onChange={(e) => {
                              setCheckAdditionalCharges(!checkAdditionalCharges);
                            }}
                            checked={checkAdditionalCharges}
                          />
                        }
                        label="Additional Charges"
                      />
                    </FormGroup>
                  </span>
                  <span>:</span>
                </Typography>
                <Typography
                  sx={{
                    flex: 1,
                    marginLeft: "20px",
                  }}
                  component="div"
                >
                  <TextField
                    id="standard-basic"
                    variant="standard"
                    placeholder="Enter Amount"
                    disabled={!checkAdditionalCharges}
                  />
                </Typography>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                  }}
                >
                  +/- Round off<span>:</span>
                </Typography>
                <Typography
                  sx={{
                    flex: 1,
                    marginLeft: "20px",
                  }}
                >
                  - 0.5
                </Typography>
              </Box>
            </Box>
            <Divider />
            <Box sx={{ padding: "20px 30px" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flex: 1,
                    fontSize: "19px",
                  }}
                >
                  Invoice Value<span>:</span>
                </Typography>
                <Typography
                  sx={{
                    flex: 1,
                    marginLeft: "20px",
                    fontSize: "24px",
                    fontWeight: "bold",
                  }}
                >
                  50,500 /-
                </Typography>
              </Box>
              <Typography sx={{ fontSize: "17px", fontWeight: "500", marginTop: "20px" }}>
                Rupees Five Thousand Five Hundred Only
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
