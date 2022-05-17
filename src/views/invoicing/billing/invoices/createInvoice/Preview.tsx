import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Grid, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { logo } from "assets";
import InvoiceHeadings from "./InvoiceHeadings";

const Preview = () => {
  return (
    <>
      <Paper
        elevation={5}
        sx={{
          width: "1099px",
          height: "1922px",
          margin: "auto",
          padding: "100px",
        }}
      >
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box sx={{ color: "#0D46A0", fontSize: "28px", fontWeight: 600 }}>
              TAX INVOICE
            </Box>
            <Box>Invoice To : Venkat Yellapragada</Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <img src={logo} alt="" />
          </Grid>
          <Grid item xs={6}>
            <InvoiceHeadings title={"Billed By"} />
            <Box p={2}>
              <Box>
                <img src={logo} alt="" />
              </Box>
              <Typography variant="body1">Vider Business Solutions</Typography>
              <Typography variant="body1">
                2/91/20, BP Raju Marg, Laxmi Cyber City, Whitefields, Kondapur,
                Telangana 500081
              </Typography>
              <Typography variant="body1">
                9947368386, Viderbusiness@gmail.com
              </Typography>
            </Box>
          </Grid>
          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Box sx={{ width: "50%" }}>
              <Box sx={{ color: "#0D46A0", fontSize: "28px", fontWeight: 600 }}>
                #INV7362773
              </Box>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={6}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Invoice Date</Typography>
                    <span>:</span>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1">25 Jan, 2022</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Terms</Typography>
                    <span>:</span>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1">Net 30</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="body2">Due Date</Typography>
                    <span>:</span>
                  </Box>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1">30 Jan, 2022</Typography>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={6}>
            <InvoiceHeadings title={"Billed To"} />
            <Box p={2}>
              <Box>
                <img src={logo} alt="" />
              </Box>
              <Typography variant="body1">Vider Business Solutions</Typography>
              <Typography variant="body1">
                2/91/20, BP Raju Marg, Laxmi Cyber City, Whitefields, Kondapur,
                Telangana 500081
              </Typography>
              <Typography variant="body1">
                9947368386, Viderbusiness@gmail.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <InvoiceHeadings title={"Shipping Address"} />
            <Box p={2}>
              <Box>
                <img src={logo} alt="" />
              </Box>
              <Typography variant="body1">Vider Business Solutions</Typography>
              <Typography variant="body1">
                2/91/20, BP Raju Marg, Laxmi Cyber City, Whitefields, Kondapur,
                Telangana 500081
              </Typography>
              <Typography variant="body1">
                9947368386, Viderbusiness@gmail.com
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <TableContainer>
              <Table>
                <TableHead
                  sx={{
                    backgroundColor: "#0D47A1",
                    "& th": { color: "white" },
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      Particulars (Task / Service name)
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      HSN / SAC
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      Units
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      Rate
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      Discount
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      Taxable Value
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      IGST
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      GST Registration
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      34355
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>44</TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>1</TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>233</TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>2</TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>2</TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>2</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <TableContainer>
              <Table>
                <TableHead
                  sx={{
                    backgroundColor: "#0D47A1",
                    "& th": { color: "white" },
                  }}
                >
                  <TableRow>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      Services as a Pure Agent
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      Amount
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      GST Registration
                    </TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      250 /-
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ border: "none !important" }}></TableCell>
                    <TableCell sx={{ border: "1px solid gray" }}>
                      <Typography sx={{ fontSize: "11px" }}>
                        Total Amount :
                      </Typography>
                      <Typography>250/-</Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                backgroundColor: "#f3f5fa",
              }}
            >
              <Box p={4}>
                <Box sx={{ color: "gray", fontSize: "12px" }}>
                  Payment summary
                </Box>

                <Box>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display="flex" gap={1}>
                        <Typography sx={{ flex: 1 }} variant="body1">
                          Total Taxable Value
                        </Typography>
                        <span>:</span>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">500</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display="flex" gap={1} alignItems="center">
                        <Typography>Add TDS</Typography>

                        <span>:</span>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box display="flex" flex={1} gap={1}>
                        <Typography>: 500</Typography>
                      </Box>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display="flex" gap={1}>
                        <Typography sx={{ flex: 1 }} variant="body1">
                          Net Value
                        </Typography>
                        <span>:</span>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">500 /-</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display="flex" gap={1}>
                        <Typography sx={{ flex: 1 }} variant="body1">
                          Total IGST
                        </Typography>
                        <span>:</span>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">500 /-</Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display="flex" gap={1}>
                        <Typography sx={{ flex: 1 }} variant="body1">
                          Sub Total
                        </Typography>
                        <span>:</span>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">700 /-</Typography>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display="flex" gap={1}>
                        <Typography variant="body2">Pure Agent</Typography>
                        <span>:</span>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">200/-</Typography>
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} alignItems="flex-end">
                    <Grid item xs={6}>
                      <Box display="flex" gap={1} alignItems="center">
                        <Typography>Additional Charges</Typography>
                        <span>:</span>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box> - </Box>
                    </Grid>
                  </Grid>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display="flex" gap={1}>
                        <Typography variant="body2" sx={{ flex: 1 }}>
                          +/- Round off
                        </Typography>
                        <span>:</span>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">4</Typography>
                    </Grid>
                  </Grid>
                </Box>

                <Box>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={6}>
                      <Box display="flex" gap={1}>
                        <Typography sx={{ flex: 1 }} variant="body1">
                          Invoice Value
                        </Typography>
                        <span>:</span>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">1000 /-</Typography>
                    </Grid>
                  </Grid>
                  <Typography>
                    Rupees Five Thousand Five Hundred Only
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <InvoiceHeadings title="Bank Account Details" />
          </Grid>
          <Grid item xs={6}>
            <Grid container spacing={2} pl={2} alignItems="center">
              <Grid item xs={6}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Bank Name</Typography>
                  <span>:</span>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">HDFC Bank</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Bank Branch</Typography>
                  <span>:</span>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">Manikonda</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">Bank Account Number</Typography>
                  <span>:</span>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">8834 8570 8382 5432</Typography>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography variant="body2">IFSC Code</Typography>
                  <span>:</span>
                </Box>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="body1">HDFC0034545</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <QrCode2Icon sx={{ fontSize: "150px" }} />
          </Grid>
        </Grid>
        <Grid container spacing={4} sx={{ marginTop: "20px" }}>
          <Grid item xs={12}>
            <InvoiceHeadings title="Terms & Conditions" />
          </Grid>
          <Grid item xs={8}>
            <ol>
              <li>
                Please pay within 15 days from the date of invoice, overdue
                interest @ 14% will be charged on delayed payments.
              </li>
              <li>Please quote invoice number when remitting funds.</li>
            </ol>
          </Grid>
          <Grid item xs={4}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "80px",
                border: "1px solid #22222226",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              signature
            </Box>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <Box
              sx={{
                display: "flex",
                width: "100%",
                height: "80px",
                marginTop: "30px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              For any enquiry, reach out via email :
              <span style={{ color: "#0D47A1" }}> viderbusiness@gmail.com</span>
              or call on
              <span style={{ color: "#0D47A1" }}>+91 81211 81212</span>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default Preview;
