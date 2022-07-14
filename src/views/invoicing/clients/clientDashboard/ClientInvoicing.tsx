import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";
import { Button, Paper, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";
import ShareIcon from "@mui/icons-material/Share";
import MailIcon from "@mui/icons-material/Mail";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import PrintIcon from "@mui/icons-material/Print";

const ClientInvoicing = () => {
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event: any, index: any) => {
    setSelectedIndex(index);
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="baseline">
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            margin: "20px 0",
          }}
        >
          <SearchContainer
            value={search}
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
          <Button variant="outlined" color="secondary">
            +Add New Invoice
          </Button>
        </Box>
      </Box>
      <Paper>
        <Box display="flex">
          <Box
            sx={{
              width: "100%",
              maxWidth: 300,
              bgcolor: "background.paper",
              borderRight: "1px solid #22222214",
            }}
          >
            <Typography p={2} variant="subtitle2">
              Invoices
            </Typography>
            <Divider />
            <List
              component="nav"
              aria-label="main mailbox folders"
              sx={{ height: "65vh", overflow: "scroll" }}
            >
              {data.map((item, index) => {
                return (
                  <>
                    <ListItemButton
                      selected={selectedIndex === item.id}
                      onClick={(event) => handleListItemClick(event, item.id)}
                    >
                      <Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width={250}
                        >
                          <Typography variant="inherit">{item.date}</Typography>
                          <Typography variant="subtitle2">
                            {item.amount}
                          </Typography>
                        </Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          width={250}
                        >
                          <Typography variant="subtitle2">
                            {item.invoiceNum}
                          </Typography>
                          <Typography variant="inherit">
                            {item.status}
                          </Typography>
                        </Box>
                      </Box>
                    </ListItemButton>
                    <Divider />
                  </>
                );
              })}
            </List>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box p={1} display="flex" justifyContent="space-between">
              <Box flex={1}>
                <Typography variant="subtitle2">Invoice VDU232983</Typography>
              </Box>
              <Box
                flex={2}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <Button startIcon={<ReceiptIcon />}>Record Receipt</Button>
                <Button startIcon={<ShareIcon />}> Share</Button>
                <Button startIcon={<MailIcon />}> Send mail</Button>
                <Button startIcon={<ModeEditIcon />}>Print</Button>
                <Button startIcon={<PrintIcon />}>Edit</Button>
              </Box>
            </Box>
            <Divider />
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};
export default ClientInvoicing;

const data = [
  {
    id: 1,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
  {
    id: 2,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
  {
    id: 3,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
  {
    id: 4,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
  {
    id: 5,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
  {
    id: 6,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },

  {
    id: 7,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
  {
    id: 8,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
  {
    id: 9,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
  {
    id: 10,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
  {
    id: 11,
    date: "21 Dec 2021",
    amount: "INR 2000",
    invoiceNum: "INV000457",
    status: "paid",
  },
];
