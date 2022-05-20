import { Box, Checkbox, FormControlLabel, TextField, Typography } from "@mui/material";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import PaymentSummaryCard from "./PaymentSummaryCard";


const InvoiceReceipt = () => {
    useTitle("Receipts Table");



    const pureAgent = (
        <>
            <TextField size="small" placeholder="Enter amount" /><br />
            <FormControlLabel control={<Checkbox />} label="Pay in Full" />
        </>

    );

    const servicePayment = (
        <>
            <TextField size="small" placeholder="Enter amount" /><br />
            <FormControlLabel control={<Checkbox />} label="Pay in Full" />
        </>

    );



    const columns = [
        {
            title: "Invoice Number",
            key: "invoiceNumber"
        },
        {
            title: "Invoice Date",
            key: "invoiceDate"
        },
        {
            title: "Due Date",
            key: "dueDate"
        },
        {
            title: "Invoice Amount",
            key: "invoiceAmount"
        },
        {
            title: "Pure Agent Amount",
            key: "pureAgentAmount"
        },
        {
            title: "Pure Agent Due Amount",
            key: "pureAgentDueAmount"
        },
        {
            title: "Pure Agent Payment",
            key: "pureAgentPayment"
        },
        {
            title: "Service Amount",
            key: "serviceAmount"
        },
        {
            title: "Service Due Amount",
            key: "serviceDueAmount"
        },
        {

            title: "Service Payment",
            key: "servicePayment"
        },
    ]


    const data = [
        {
            invoiceNumber: "INV365647",
            invoiceDate: "13/09/2021",
            dueDate: "21/09/2021",
            invoiceAmount: "3,500 /-",
            pureAgentAmount: "3,000 /-",
            pureAgentDueAmount: "3000 /-",
            pureAgentPayment: pureAgent,
            serviceAmount: "1,000 /-",
            serviceDueAmount: "100 /-",
            servicePayment: servicePayment,

        },
        {
            invoiceNumber: "INV365647",
            invoiceDate: "13/09/2021",
            dueDate: "21/09/2021",
            invoiceAmount: "3,500 /-",
            pureAgentAmount: "3,000 /-",
            pureAgentDueAmount: "3000 /-",
            pureAgentPayment: pureAgent,
            serviceAmount: "1,000 /-",
            serviceDueAmount: "100 /-",
            servicePayment: servicePayment,

        },
        {
            invoiceNumber: "INV365647",
            invoiceDate: "13/09/2021",
            dueDate: "21/09/2021",
            invoiceAmount: "3,500 /-",
            pureAgentAmount: "3,000 /-",
            pureAgentDueAmount: "3000 /-",
            pureAgentPayment: pureAgent,
            serviceAmount: "1,000 /-",
            serviceDueAmount: "100 /-",
            servicePayment: servicePayment,

        },
        {
            invoiceNumber: "INV365647",
            invoiceDate: "13/09/2021",
            dueDate: "21/09/2021",
            invoiceAmount: "3,500 /-",
            pureAgentAmount: "3,000 /-",
            pureAgentDueAmount: "3000 /-",
            pureAgentPayment: pureAgent,
            serviceAmount: "1,000 /-",
            serviceDueAmount: "100 /-",
            servicePayment: servicePayment,

        },
        {
            invoiceNumber: "INV365647",
            invoiceDate: "13/09/2021",
            dueDate: "21/09/2021",
            invoiceAmount: "3,500 /-",
            pureAgentAmount: "3,000 /-",
            pureAgentDueAmount: "3000 /-",
            pureAgentPayment: pureAgent,
            serviceAmount: "1,000 /-",
            serviceDueAmount: "100 /-",
            servicePayment: servicePayment,

        },
    ]

    return (
        <Box mt={3}>
            <Box mb={1}>
                <Typography variant="caption">Available Invoices</Typography>
            </Box>
            <Table data={data || []} columns={columns} loading={false} />
            <Box mt={3} display="flex" justifyContent="flex-end">
                <PaymentSummaryCard amtReceived={5000} amtUsedForPayment={6000} unusedCredits={500} />
            </Box>


        </Box>
    );
}
export default InvoiceReceipt;