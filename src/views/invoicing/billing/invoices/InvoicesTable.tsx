import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import {
  Button, FormControl, IconButton, InputLabel, MenuItem, Select
} from "@mui/material";
import { Box } from "@mui/system";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { useMenu } from "context/MenuPopover";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const InvoiceTable = () => {
  useTitle("Invoice Table");

  const [, setSearch] = useState("");
  const navigate = useNavigate();

  const [filterBy, setFilterBy] = useState("");

  const handleAddNewInvoice = () => {
    navigate("/invoicing/create-invoice");
  };


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
          <SearchContainer
            minWidth="400px"
            placeHolder="Search for estimate"
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
          <FormControl size="small" sx={{ minWidth: "140px" }}>
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
          onClick={handleAddNewInvoice}
        >
          + Add new invoice
        </Button>
      </Box>
      <Table data={data || []} columns={columns} loading={false} />
    </Box>
  );
};


const TableActions = () => {
  const menu = useMenu();
  const navigate = useNavigate()


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    menu({
      target: e.currentTarget,
      position: "bottom-right",
      options: [
        {
          label: "Download Invoice PDF",
          action: () => {
          },
        },
        {
          label: "View Invoice",
          action: () => {
          },
        },
        {
          label: "Edit Invoice",
          action: () => {
            navigate("/invoicing/create-invoice")
          },
        },
        {
          label: "Create Payment Receipt",
          action: () => { },
        },
        {
          label: "Cancel Invoice",
          action: () => { },
        },
      ],
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <MoreVertOutlinedIcon color="primary" />
    </IconButton>
  );
};

const columns = [
  {
    key: "invoiceDate",
    title: "Invoice Date",
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
    key: "invoiceAmount",
    title: "Invoice Amount",
  },
  {
    key: "dueDate",
    title: "Due Date",
  },
  {
    key: "balanceDue",
    title: "Balance Due",
  },
  {
    key: "status",
    title: "Invoice Status",
  },
  {
    key: "actions",
    title: "Actions",
    render: () => <TableActions />,
  },
];

const data = [
  {
    invoiceNumber: "INV365647",
    client: "Doris Riley",
    invoiceDate: "11/09/2021",
    dueDate: "11/09/2021",
    invoiceAmount: "1852 /-",
    balanceDue: "850 /-",
    status: "Paid",
  },
  {
    invoiceNumber: "INV365647",
    client: "Doris Riley",
    invoiceDate: "11/09/2021",
    dueDate: "11/09/2021",
    invoiceAmount: "1852 /-",
    balanceDue: "850 /-",
    status: "Overdue",
  },
  {
    invoiceNumber: "INV365647",
    client: "Doris Riley",
    invoiceDate: "11/09/2021",
    dueDate: "11/09/2021",
    invoiceAmount: "1852 /-",
    balanceDue: "850 /-",
    status: "Canceled",
  },
  {
    invoiceNumber: "INV365647",
    client: "Doris Riley",
    invoiceDate: "11/09/2021",
    dueDate: "11/09/2021",
    invoiceAmount: "1852 /-",
    balanceDue: "850 /-",
    status: "Paid",
  },
  {
    invoiceNumber: "INV365647",
    client: "Doris Riley",
    invoiceDate: "11/09/2021",
    dueDate: "11/09/2021",
    invoiceAmount: "1852 /-",
    balanceDue: "850 /-",
    status: "Paid",
  },
  {
    invoiceNumber: "INV365647",
    client: "Doris Riley",
    invoiceDate: "11/09/2021",
    dueDate: "11/09/2021",
    invoiceAmount: "1852 /-",
    balanceDue: "850 /-",
    status: "Paid",
  },
  {
    invoiceNumber: "INV365647",
    client: "Doris Riley",
    invoiceDate: "11/09/2021",
    dueDate: "11/09/2021",
    invoiceAmount: "1852 /-",
    balanceDue: "850 /-",
    status: "Paid",
  },
];


export default InvoiceTable;
