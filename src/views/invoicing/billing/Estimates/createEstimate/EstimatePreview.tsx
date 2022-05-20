import QrCode2Icon from "@mui/icons-material/QrCode2";
import { Divider, Grid, Typography } from "@mui/material";
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

const EstimatePreview = () => {
    return (
        <>
            <Paper
                elevation={5}
                sx={{
                    width: "1099px",
                    height: "1922px",
                    margin: "auto",
                    padding: "50px",
                }}
            >
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box sx={{ color: "#0D46A0", fontSize: "28px", fontWeight: 600 }}>
                            ESTIMATE
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
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant="body1">GST Treatment</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography>:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body1" >Registered Business - Regular</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant="body1">GSTIN</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography>:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body1" >365473538457</Typography>
                                </Grid>
                            </Grid>
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
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant="body1">GST Treatment</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography>:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body1" >Registered Business - Regular</Typography>
                                </Grid>
                            </Grid>
                            <Grid container>
                                <Grid item xs={4}>
                                    <Typography variant="body1">GSTIN</Typography>
                                </Grid>
                                <Grid item xs={1}>
                                    <Typography>:</Typography>
                                </Grid>
                                <Grid item xs={7}>
                                    <Typography variant="body1" >365473538457</Typography>
                                </Grid>
                            </Grid>
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
                                    <TableRow sx={{
                                        "& .MuiTableCell-root": {
                                            border: "1px solid gray",
                                        },
                                    }}>
                                        <TableCell>
                                            Particulars (Task / Service name)
                                        </TableCell>
                                        <TableCell>
                                            HSN / SAC
                                        </TableCell>
                                        <TableCell>
                                            Units
                                        </TableCell>
                                        <TableCell>
                                            Rate
                                        </TableCell>
                                        <TableCell>
                                            Discount
                                        </TableCell>
                                        <TableCell>
                                            Taxable Value
                                        </TableCell>
                                        <TableCell>
                                            IGST
                                        </TableCell>
                                        <TableCell>
                                            Amount
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow sx={{
                                        "& .MuiTableCell-root": {
                                            border: "1px solid gray",
                                        },
                                    }}
                                    >
                                        <TableCell>
                                            GST Registration
                                        </TableCell>
                                        <TableCell>
                                            34355
                                        </TableCell>
                                        <TableCell>44</TableCell>
                                        <TableCell>1</TableCell>
                                        <TableCell>233</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>2</TableCell>
                                        <TableCell>2</TableCell>
                                    </TableRow>
                                    <TableRow sx={{
                                        "& .MuiTableCell-root": {
                                            border: "1px solid gray",
                                        },
                                    }}>
                                        <TableCell
                                            colSpan={5}
                                            sx={{
                                                border: "none !important",
                                            }}
                                        >
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption">Total :</Typography>
                                            <Typography variant="body2">40,000/-</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption">Total IGST:</Typography>
                                            <Typography variant="body2">2,000/-</Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography variant="caption">Total Amount:</Typography>
                                            <Typography variant="body2">50,000/-</Typography>
                                        </TableCell>
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
                                            <Typography variant="subtitle2">50000</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={6}>
                                            <Box display="flex" gap={1} alignItems="center">
                                                <Typography sx={{ flex: 1 }} variant="body1">Pure Agent</Typography>

                                                <span>:</span>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body1">500</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={6}>
                                            <Box display="flex" gap={1}>
                                                <Typography sx={{ flex: 1 }} variant="body1">
                                                    Add TDS
                                                </Typography>
                                                <span>:</span>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body1">500 /-</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={6}>
                                            <Box display="flex" gap={1}>
                                                <Typography sx={{ flex: 1 }} variant="body1">
                                                    Additional Charges
                                                </Typography>
                                                <span>:</span>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body1">500 /-</Typography>
                                        </Grid>
                                    </Grid>
                                </Box>

                                <Box>
                                    <Grid container spacing={2} alignItems="center">
                                        <Grid item xs={6}>
                                            <Box display="flex" gap={1}>
                                                <Typography sx={{ flex: 1 }} variant="body1">
                                                    +/- Round off
                                                </Typography>
                                                <span>:</span>
                                            </Box>
                                        </Grid>
                                        <Grid item xs={6}>
                                            <Typography variant="body1">0.02</Typography>
                                        </Grid>
                                    </Grid>
                                    <Divider sx={{ mt: "10px", mb: "10px" }} />
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
                                            <Typography variant="subtitle1">1000/-</Typography>
                                        </Grid>
                                    </Grid>
                                    <Typography mt={2}>
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

export default EstimatePreview;
