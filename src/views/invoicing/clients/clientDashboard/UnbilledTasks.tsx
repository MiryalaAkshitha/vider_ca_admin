import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { Button } from "@mui/material";
import { Box } from "@mui/system";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useRef, useState } from "react";


const UnbilledTasks = () => {
  useTitle("Invoice Table");
  const selectionRef = useRef<any>({});
  const [, setSearch] = useState("");
  const [, setSelected] = useState("");


  const handleClientClick = () => {
    // navigate("/invoicing/clients/id/overview");
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
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
        <Box>
          <Button variant="outlined" color="secondary" >
            +Add new Invoice
          </Button>
          <Button sx={{ ml: "15px" }} variant="contained" color="secondary" > Generate Invoice</Button>
        </Box>
      </Box>

      <Table onRowClick={handleClientClick} data={data || []} columns={columns} loading={false} selection={{
        selectionRef: selectionRef,
        onSelect: (selected) => {
          setSelected(selected);
        },
      }} />
    </Box>
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
    key: "fee",
    title: "Fee",
  },
  {
    key: "charges",
    title: "Charges",
  },
];



const data = [
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "To-Do",
    fee: "200/-",
    charges: "87456/-",

  },
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "Inprogress",
    fee: "200/-",
    charges: "87456/-",

  },
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "Completed",
    fee: "200/-",
    charges: "87456/-",

  },
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "To-Do",
    fee: "200/-",
    charges: "87456/-",

  },
  {
    taskName: "Accounting audits (VD4832)",
    taskStatus: "To-Do",
    fee: "200/-",
    charges: "87456/-",

  },

];



export default UnbilledTasks;
