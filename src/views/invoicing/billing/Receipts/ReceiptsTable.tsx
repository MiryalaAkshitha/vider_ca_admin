import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import {
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActionsMenu from "./ActionsMenu";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const ReceiptsTable = () => {
  useTitle("Receipts Table");

  const [serachKeyword, setSearchKeyword] = useState("");
  const [actionsAnchorEl, setActionsAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [filterBy, setFilterBy] = useState("");
  const navigate = useNavigate();

  const handleAddNewReceipt = () => {
    navigate("/invoicing/create-receipt");
  };

  const actionsIcon = (
    <IconButton onClick={(e) => setActionsAnchorEl(e.currentTarget)}>
      <MoreVertOutlinedIcon color="primary" />
    </IconButton>
  );

  const columns = [
    {
      key: "paymentDate",
      title: "Payment Date",
    },
    {
      key: "paymentReferenceNumber",
      title: "Payment Reference Number",
    },
    {
      key: "invoiceNumber",
      title: "Invoice number",
    },
    {
      key: "client",
      title: "Client name",
    },
    {
      key: "amountPaid",
      title: " Amount Paid",
    },
    {
      key: "amountdue",
      title: "Amount Due",
    },
    {
      key: "status",
      title: "Receipt Status",
    },
    {
      key: "actions",
      title: "Actions",
    },
  ];

  const data = [
    {
      paymentDate: "11/09/2021",
      paymentReferenceNumber: "1246713",
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      amountdue: "11/09/2021",
      amountPaid: "1852 /-",
      status: "Approved",
      actions: actionsIcon,
    },
    {
      paymentDate: "11/09/2021",
      paymentReferenceNumber: "1246713",
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      amountdue: "11/09/2021",
      amountPaid: "1852 /-",
      status: "Draft",
      actions: actionsIcon,
    },
    {
      paymentDate: "11/09/2021",
      paymentReferenceNumber: "1246713",
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      amountdue: "11/09/2021",
      amountPaid: "1852 /-",
      status: "Approved",
      actions: actionsIcon,
    },
    {
      paymentDate: "11/09/2021",
      paymentReferenceNumber: "1246713",
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      amountdue: "11/09/2021",
      amountPaid: "1852 /-",
      status: "Draft",
      actions: actionsIcon,
    },
    {
      paymentDate: "11/09/2021",
      paymentReferenceNumber: "1246713",
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      amountdue: "11/09/2021",
      amountPaid: "1852 /-",
      status: "Approved",
      actions: actionsIcon,
    },
    {
      paymentDate: "11/09/2021",
      paymentReferenceNumber: "1246713",
      invoiceNumber: "INV365647",
      client: "Doris Riley",
      amountdue: "11/09/2021",
      amountPaid: "1852 /-",
      status: "Draft",
      actions: actionsIcon,
    },
  ];

  return (
    <Box p={3}>
      <Box
        sx={{
          alignItems: "center",
          margin: "20px 0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
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
            label={
              <Typography sx={{ fontSize: "14px" }}>
                Search by Name / Client Type
              </Typography>
            }
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
              marginRight: "10px",
              height: "55px",
            }}
          >
            <ImportExportOutlinedIcon />
          </Button>
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
        <Button
          variant="outlined"
          color="secondary"
          sx={{ height: "55px" }}
          onClick={handleAddNewReceipt}
        >
          + Add new Receipt
        </Button>
      </Box>
      <Table data={data || []} columns={columns} loading={false} />
      <ActionsMenu
        actionsAnchorEl={actionsAnchorEl}
        setActionsAnchorEl={setActionsAnchorEl}
      />
    </Box>
  );
};
export default ReceiptsTable;
