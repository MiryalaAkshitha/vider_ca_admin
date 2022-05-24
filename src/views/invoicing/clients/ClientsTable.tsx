import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ClientsTable = () => {
    useTitle("Invoice Table");
    const [, setSearch] = useState("");
    const navigate = useNavigate();

    const handleClientClick = () => {
        navigate("/invoicing/clients/id/overview");
    };

    const columns = [
        {
            key: "clientName",
            title: "Client name / Group name",
        },
        {
            key: "clientCategory",
            title: "Client Category",
        },
        {
            key: "totalTasks",
            title: "Total Tasks",
        },
        {
            key: "unbilledTasks",
            title: "Unbilled Tasks",
        },
        {
            key: "billedTasks",
            title: "Billed Tasks",
        },
        {
            key: "amountDue",
            title: "Amount Due",
        },
    ];

    const data = [
        {
            clientName: "Roy Capital",
            clientCategory: "Individual",
            totalTasks: "20",
            unbilledTasks: "12",
            billedTasks: "8",
            amountDue: "20,000 /-",

        },
        {
            clientName: "Roy Capital",
            clientCategory: "Company",
            totalTasks: "20",
            unbilledTasks: "12",
            billedTasks: "8",
            amountDue: "20,000 /-",

        },
        {
            clientName: "Roy Capital",
            clientCategory: "Individual",
            totalTasks: "20",
            unbilledTasks: "12",
            billedTasks: "8",
            amountDue: "20,000 /-",

        },
        {
            clientName: "Roy Capital",
            clientCategory: "Individual",
            totalTasks: "20",
            unbilledTasks: "12",
            billedTasks: "8",
            amountDue: "20,000 /-",

        },
        {
            clientName: "Roy Capital",
            clientCategory: "Individual",
            totalTasks: "20",
            unbilledTasks: "12",
            billedTasks: "8",
            amountDue: "20,000 /-",

        },
    ];

    return (
        <Box p={3}>
            <Box sx={{
                display: "flex",
                alignItems: "center",
                margin: "20px 0",
            }}>
                <SearchContainer
                    minWidth="400px"
                    placeHolder="Search by Name / Client Type"
                    onChange={setSearch}
                />
                <Button
                    variant="outlined"
                    sx={{
                        minWidth: "auto",
                        marginLeft: "10px",
                        marginRight: "10px",
                    }}
                >
                    <ImportExportOutlinedIcon />
                </Button>
            </Box>

            <Table onRowClick={handleClientClick} data={data || []} columns={columns} loading={false} />
        </Box>
    );
};





export default ClientsTable;
