import { useState } from "react";
import {
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import Table from "components/Table";
import ActionsMenu from "./ActionsMenu";
import useTitle from "hooks/useTitle";

const BillingTable = () => {
  useTitle("Invoice/Billing/Invoices");

  const [serachKeyword, setSearchKeyword] = useState("");
  const [filterBy, setFilterBy] = useState("");

  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(null);

  const actionsIcon = (
    <IconButton onClick={(e) => setActionsAnchorEl(e.currentTarget)}>
      <MoreVertOutlinedIcon color="primary" />
    </IconButton>
  );

  const actionsItems = [
    "Generate Receipt",
    "Send Reminder",
    "Debit note",
    "Credit note",
    "Supplementary Invoice",
    "Cancel Invoice",
  ];

  const columns = [
    {
      key: "invoiceNumber",
      title: "Invoice number",
    },
    {
      key: "client",
      title: "Client name",
    },
    {
      key: "invoiceDate",
      title: "Invoice Date",
    },
    {
      key: "dueDate",
      title: "Due Date",
    },
    {
      key: "invoiceAmount",
      title: "Invoice Amount",
    },
    {
      key: "status",
      title: "Status",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  const data = [
    {
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      invoiceDate: "11/09/2021",
      dueDate: "11/09/2021",
      invoiceAmount: "1852 /-",
      status: "Paid",
      actions: actionsIcon,
    },
    {
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      invoiceDate: "11/09/2021",
      dueDate: "11/09/2021",
      invoiceAmount: "1852 /-",
      status: "Paid",
      actions: actionsIcon,
    },
    {
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      invoiceDate: "11/09/2021",
      dueDate: "11/09/2021",
      invoiceAmount: "1852 /-",
      status: "Paid",
      actions: actionsIcon,
    },
    {
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      invoiceDate: "11/09/2021",
      dueDate: "11/09/2021",
      invoiceAmount: "1852 /-",
      status: "Paid",
      actions: actionsIcon,
    },
    {
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      invoiceDate: "11/09/2021",
      dueDate: "11/09/2021",
      invoiceAmount: "1852 /-",
      status: "Paid",
      actions: actionsIcon,
    },
    {
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      invoiceDate: "11/09/2021",
      dueDate: "11/09/2021",
      invoiceAmount: "1852 /-",
      status: "Paid",
      actions: actionsIcon,
    },
    {
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      invoiceDate: "11/09/2021",
      dueDate: "11/09/2021",
      invoiceAmount: "1852 /-",
      status: "Paid",
      actions: actionsIcon,
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignSelf: "stretch",
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
          <Button
            variant="outlined"
            sx={{
              minWidth: "auto",
              marginLeft: "10px",
            }}
          >
            <ImportExportOutlinedIcon />
          </Button>
        </Box>
        <FormControl sx={{ minWidth: "140px" }}>
          <InputLabel id=" ">Filter By</InputLabel>
          <Select
            labelId="filter"
            label="Filter By"
            value={filterBy}
            onChange={(e) => {
              setFilterBy(e.target.value);
            }}
          >
            <MenuItem value={"Financial year"}>Financial year</MenuItem>
            <MenuItem value={"Quarterly"}>Quarterly</MenuItem>
            <MenuItem value={"Monthly"}>Monthly</MenuItem>
            <MenuItem value={"Weekly"}>Weekly</MenuItem>
            <MenuItem value={"Custom"}>Custom</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Table data={data || []} columns={columns} loading={false} />
      <ActionsMenu
        options={actionsItems}
        actionsAnchorEl={actionsAnchorEl}
        setActionsAnchorEl={setActionsAnchorEl}
      />
    </>
  );
};

export default BillingTable;
