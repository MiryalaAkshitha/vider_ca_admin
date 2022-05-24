import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { useMenu } from "context/MenuPopover";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";


const PaymentReceived = () => {
  useTitle("Invoice Table");
  const [, setSearch] = useState("");

  const handleClientClick = () => {
    // navigate("/invoicing/clients/id/overview");
  };

  return (
    <Box p={3}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        margin: "20px 0",
      }}>
        <SearchContainer
          minWidth="400px"
          placeHolder="Search"
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

const TableActions = () => {
  const menu = useMenu();


  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    menu({
      target: e.currentTarget,
      position: "bottom-right",
      options: [
        {
          label: "Send Reminder",
          action: () => {
          },
        },
        {
          label: "Generate Receipt",
          action: () => {
          },
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
    key: "taskName",
    title: "Task name (Task ID)",
  },
  {
    key: "taskStatus",
    title: "Task Status",
  },
  {
    key: "amount",
    title: "Amount",
  },
  {
    key: "amountStatus",
    title: "Amount Status",
  },
  {
    key: "Actions",
    title: "Actions",
    render: () => <TableActions />,
  },
];

const data = [
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "To-Do",
    amount: "200/-",
    amountStatus: "Unbilled",

  },
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "Inprogress",
    amount: "200/-",
    amountStatus: "Billed",

  },
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "Completed",
    amount: "200/-",
    amountStatus: "Unbilled",

  },
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "To-Do",
    amount: "200/-",
    amountStatus: "Unbilled",

  },
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "To-Do",
    amount: "200/-",
    amountStatus: "Unbilled",

  },

];



export default PaymentReceived;
