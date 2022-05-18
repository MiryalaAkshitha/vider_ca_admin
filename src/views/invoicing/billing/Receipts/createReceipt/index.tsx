import { Box, Typography, TextField, FormControl, RadioGroup, FormControlLabel, FormLabel } from "@mui/material"
import { useState } from "react";
import Radio from "@mui/material/Radio";
import InvoiceReceipt from "./InvoiceReceipt";
import TaskReceipt from "./TaskReceipt";
import AdvanceReceipt from "./AdvanceReceipt";


const Receipt = () => {
    const [value, setValue] = useState("");

    const handleRadioChange = (e) => {
        setValue(e.target.value)
    }

    return (
        <>
            <Box display="flex" justifyContent="center" p={3}>
                <Typography variant="h4">RECEIPT</Typography>
            </Box>
            <Box p={3}>
                <TextField sx={{ width: "500px" }} id="outlined-basic" label="Receipt number" variant="outlined" />
                <br />
                <TextField
                    sx={{ width: "500px", mt: "30px" }}
                    id="date"
                    type={"date"}
                    InputLabelProps={{ shrink: true }}
                    label="Invoice Date"
                    variant="outlined"
                    onChange={(e) => { }}
                />
                <Box mt={4}>
                    <FormControl>
                        <FormLabel>What are you generating the receipt for?</FormLabel>
                        <RadioGroup row>
                            <FormControlLabel
                                value="invoice"
                                control={<Radio />}
                                label="Invoice"
                                onChange={handleRadioChange}
                            />
                            <FormControlLabel
                                value="task"
                                control={<Radio />}
                                label="Task"
                                onChange={handleRadioChange}

                            />
                            <FormControlLabel
                                value="customerAdvance"
                                control={<Radio />}
                                label="Customer Advance"
                                onChange={handleRadioChange}

                            />
                        </RadioGroup>
                    </FormControl>
                </Box>
                {value === "invoice" && <InvoiceReceipt />}
                {value === "task" && <TaskReceipt />}
                {value === "customerAdvance" && <AdvanceReceipt />}
            </Box>
        </>

    );
}
export default Receipt