import {
    Box,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import Radio from "@mui/material/Radio";
import { getClients } from "api/services/client";
import { useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import {
    handleClientChange,
    selectInvoice
} from "redux/reducers/createInvoiceSlice";
import { ResType } from "types";
import AmountReceived from "./AmountReceived";
import CustomerAdvanceReceipt from "./CustomerAdvanceReceipt";
import BottomBar from "./BottomBar";
import InvoiceReceipt from "./InvoiceReceipt";
import TaskReceipt from "./TaskReceipt";


const Receipt = () => {
    const [value, setValue] = useState("");

    const { client } = useSelector(selectInvoice);
    const dispatch = useDispatch();

    const { data }: ResType = useQuery(["clients", {}], getClients);

    const handleRadioChange = (e: any) => {
        setValue(e.target.value)
    }

    return (
        <>
            <Box display="flex" justifyContent="center" p={3}>
                <Typography variant="h4">RECEIPT</Typography>
            </Box>
            <Box p={7} sx={{ margin: "50px 0 100px 0" }}>
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
                <Box maxWidth={500} sx={{ mt: "30px" }}>
                    <FormControl size="small" fullWidth>
                        <InputLabel id="invoiceCustomer">Select Client</InputLabel>
                        <Select
                            size="medium"
                            labelId="invoiceCustomer"
                            id="invoiceCustomer"
                            value={client}
                            label="Customer"
                            defaultValue="customer1"
                            onChange={(e) => {
                                let client = data.data[0]?.find(
                                    (client: any) => client.id === e.target.value
                                );
                                dispatch(
                                    handleClientChange({
                                        client,
                                    })
                                );
                            }}
                        >
                            {data?.data[0]?.map((client: any, index: number) => (
                                <MenuItem value={client?.id} key={index}>
                                    {client?.displayName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
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
                {(value === "invoice" || value === "task") && <AmountReceived />}
                {value === "invoice" && <InvoiceReceipt />}
                {value === "task" && <TaskReceipt />}
                {value === "customerAdvance" && <CustomerAdvanceReceipt />}
            </Box>
            <BottomBar />
        </>

    );
}
export default Receipt