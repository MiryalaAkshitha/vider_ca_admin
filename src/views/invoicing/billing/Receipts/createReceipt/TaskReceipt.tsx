import ClearIcon from "@mui/icons-material/Clear";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Box } from "@mui/system";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    handleAddParticular,
    handleChangeParticular,
    handleRemoveParticular,
    selectReceipt,
    taskReceiptHeadings
} from "redux/reducers/createReceiptSlice";
import PaymentSummaryCard from "./PaymentSummaryCard";
import SelectTaskDialog from "./SelectTaskDialog";

function TaskReceipt() {
    const state = useSelector(selectReceipt);
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const PayableAmount = (taskReceipt) => {
        let result = taskReceipt.units * taskReceipt.price;
        if (taskReceipt.discountType === "PERCENT") {
            result = result - (result * taskReceipt.discount) / 100;
        }

        if (taskReceipt.discountType === "AMOUNT") {
            result = result - taskReceipt.discount;
        }

        return result;
    }

    function updateParticular(index, key, value) {
        dispatch(
            handleChangeParticular({
                index,
                key,
                value,
            })
        );
    }

    function addNewParticular() {
        dispatch(handleAddParticular());
    }

    function removeParticular(index: number) {
        dispatch(handleRemoveParticular(index));
    }

    return (
        <Box mt={2}>
            <SelectTaskDialog open={open} setOpen={setOpen} />
            <TableContainer>
                <Table sx={{ tableLayout: "fixed", emptyCells: "hide" }}>
                    <TableHead
                        sx={{
                            backgroundColor: "#0D47A1",
                            "& th": { color: "white" },
                        }}
                    >
                        <TableRow sx={{ border: "1px solid gray" }}>
                            {taskReceiptHeadings.map((row, index) => {
                                return (
                                    <TableCell
                                        key={index}
                                        style={{ width: index === 0 ? "320px" : "auto" }}
                                    >
                                        <Typography sx={{ fontWeight: "bold" }}>{row.title}</Typography>
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.TaskReceipt.map((row, index) => (

                            < TableRow
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
                                            variant="standard"
                                            placeholder="Name of the Particular"
                                            value={row.name}
                                            onChange={(e) =>
                                                updateParticular(index, "name", e.target.value)
                                            }
                                        />
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography component="div">
                                        <TextField
                                            fullWidth
                                            id="units"
                                            select
                                            variant="standard"
                                            value={row.units}
                                            SelectProps={{ native: true }}
                                            onChange={(e) => {
                                                updateParticular(index, "units", e.target.value);
                                            }}
                                        >
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                        </TextField>
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        type="number"
                                        id="price"
                                        variant="standard"
                                        value={row.price}
                                        onChange={(e) => {
                                            updateParticular(index, "price", e.target.value);
                                        }}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Box display="flex" gap={1}>
                                        <TextField
                                            fullWidth
                                            select
                                            variant="standard"
                                            value={row.discountType}
                                            SelectProps={{ native: true }}
                                            onChange={(e) => {
                                                updateParticular(index, "discountType", e.target.value);
                                            }}
                                        >
                                            <option value="PERCENT">%</option>
                                            <option value="AMOUNT">&#8377; </option>
                                        </TextField>
                                        <TextField
                                            fullWidth
                                            type="number"
                                            variant="standard"
                                            value={row.discount}
                                            onChange={(e) => {
                                                updateParticular(index, "discount", e.target.value);
                                            }}
                                        />
                                    </Box>
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        fullWidth
                                        variant="standard"
                                        value={PayableAmount(row)}
                                        disabled
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
                                        fullWidth
                                        type="number"
                                        id="price"
                                        variant="standard"
                                        value={row.paidAmount}
                                        onChange={(e) => {
                                            updateParticular(index, "paidAmount", e.target.value);
                                        }}
                                    />

                                    <IconButton color="secondary">
                                        <ClearIcon
                                            onClick={() => {
                                                removeParticular(index);
                                            }}
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow sx={{
                            "& .MuiTableCell-root": {
                                border: "1px solid #e0e0e0",
                            },
                        }}>
                            <TableCell
                                colSpan={5}
                                sx={{
                                    border: "none !important",
                                }}
                            >
                                <Box display="flex" gap={3}>
                                    <Button onClick={() => addNewParticular()} color="secondary">
                                        + Add New Item
                                    </Button>
                                    <Button onClick={() => setOpen(true)} color="secondary">
                                        + Select Task
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>
            <Box display="flex" justifyContent="flex-end">
                <PaymentSummaryCard amtReceived={2000} amtUsedForPayment={6000} unusedCredits={500} />
            </Box>
        </Box >
    );
}

export default TaskReceipt;

