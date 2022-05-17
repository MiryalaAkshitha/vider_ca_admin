import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
    Button, IconButton,
    InputAdornment, TextField,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsMenu from "./ActionsMenu";

const EstimatesTable = () => {
    useTitle("Invoice Table");

    const [serachKeyword, setSearchKeyword] = useState("");
    const navigate = useNavigate();

    const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(null);

    const handleAddNewInvoice = () => {
        navigate("/invoicing/create-estimate")
    }

    const actionsIcon = (
        <IconButton onClick={(e) => setActionsAnchorEl(e.currentTarget)}>
            <MoreVertOutlinedIcon color="primary" />
        </IconButton>
    );



    const columns = [
        {
            key: "estimateNumber",
            title: "Estimate number",
        },
        {
            key: "client",
            title: "Client name",
        },
        {
            key: "estimateDate",
            title: "Estimate Date",
        },
        {
            key: "estimateAmount",
            title: "Estimate Amount",
        },
        {
            key: "actions",
            title: "Actions",
        },
    ];

    const data = [
        {
            estimateNumber: "INV365647",
            client: "Doris Riley",
            estimateDate: "11/09/2021",
            estimateAmount: "1852 /-",
            actions: actionsIcon,
        },
        {
            estimateNumber: "INV365647",
            client: "Doris Riley",
            estimateDate: "11/09/2021",
            estimateAmount: "1852 /-",
            actions: actionsIcon,
        },
        {
            estimateNumber: "INV365647",
            client: "Doris Riley",
            estimateDate: "11/09/2021",
            estimateAmount: "1852 /-",
            actions: actionsIcon,
        },
        {
            estimateNumber: "INV365647",
            client: "Doris Riley",
            estimateDate: "11/09/2021",
            estimateAmount: "1852 /-",
            actions: actionsIcon,
        },
        {
            estimateNumber: "INV365647",
            client: "Doris Riley",
            estimateDate: "11/09/2021",
            estimateAmount: "1852 /-",
            actions: actionsIcon,
        },
        {
            estimateNumber: "INV365647",
            client: "Doris Riley",
            estimateDate: "11/09/2021",
            estimateAmount: "1852 /-",
            actions: actionsIcon,
        },
    ];

    return (
        <Box p={3}>
            <Box sx={{
                alignItems: "center",
                margin: "20px 0",
                display: "flex",
                justifyContent: "space-between"
            }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        margin: "20px 0",
                    }}
                >

                    <TextField
                        sx={{ width: "500px" }}
                        label={<Typography sx={{ fontSize: "14px" }}>Search by Name / Client Type</Typography>}
                        variant="outlined"
                        value={serachKeyword}
                        onChange={(e) => {
                            setSearchKeyword(e.target.value);
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchOutlinedIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                </Box>
                <Button
                    variant="outlined"
                    color="secondary"
                    sx={{ height: "55px" }}
                    onClick={handleAddNewInvoice}
                >
                    + Add new estimate
                </Button>
            </Box>
            <Table data={data || []} columns={columns} loading={false} />
            <ActionsMenu
                actionsAnchorEl={actionsAnchorEl}
                setActionsAnchorEl={setActionsAnchorEl}
            />
        </Box>
    );
}
export default EstimatesTable;