import { FormControl, Box, Grid, InputLabel, MenuItem, Paper, Select, Typography, IconButton, Button } from "@mui/material";
import Table from "components/Table";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useMenu } from "context/MenuPopover";
import ImportExportOutlinedIcon from "@mui/icons-material/ImportExportOutlined";


const AgeingDues = () => {
  return (
    <Grid mt={1} container spacing={2}>
      <Grid item xs={6} >
        <Paper>
          <Box p={2} pb={0.7} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="inherit">Ageing Dues</Typography>
            <Box>
              <FormControl size="small" sx={{ width: "150px" }}>
                <InputLabel id="demo-simple-select-label">Due by</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Filter by"
                >
                  {dueBy.map((item) => {
                    return (
                      <MenuItem value={item}>{item}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
          </Box>
          <Table data={dueData || []} columns={dueColumns} loading={false} />
        </Paper>
      </Grid>
      <Grid item xs={6}>
        <Paper>
          <Box p={2} pb={0.7} display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="inherit">Ageing Dues</Typography>
            <Box>
              <FormControl size="small" sx={{ width: "150px" }}>
                <InputLabel id="demo-simple-select-label">Overdue by</InputLabel>
                <Select
                  size="small"
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Filter by"
                >
                  {dueBy.map((item) => {
                    return (
                      <MenuItem value={item}>{item}</MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
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
          </Box>
          <Table data={overDueData || []} columns={overDueColumns} loading={false} />
        </Paper>
      </Grid>

    </Grid>
  );
}
export default AgeingDues


const DueTableActions = () => {
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
      ],
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <MoreVertOutlinedIcon color="primary" />
    </IconButton>
  );
};

const dueBy = [
  "0-15 Days",
  "15-30 Days",
  "30-45 Days",
  "Above Days"
]



const dueColumns = [
  {
    key: "clientName",
    title: "Client name",
  },
  {
    key: "taskName",
    title: "Task name (Task ID)",
  },
  {
    key: "dueAmount",
    title: "Due  Amount",
  },
  {
    key: "actions",
    title: "Actions",
    render: () => <DueTableActions />,

  }
];




const dueData = [
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    dueAmount: "20,000 /-",

  },

  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    dueAmount: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    dueAmount: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    dueAmount: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    dueAmount: "20,000 /-",

  },
];


const OverDueTableActions = () => {
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
      ],
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <MoreVertOutlinedIcon color="primary" />
    </IconButton>
  );
};

const overDueColumns = [
  {
    key: "clientName",
    title: "Client name",
  },
  {
    key: "taskName",
    title: "Task name (Task ID)",
  },
  {
    key: "overDueAmount",
    title: "Overdue Amount",
  },
  {
    key: "actions",
    title: "Actions",
    render: () => <OverDueTableActions />,

  }
];



const overDueData = [
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    overDueAmount: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    overDueAmount: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    overDueAmount: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    overDueAmount: "20,000 /-",

  },
  {
    clientName: "Roy Capital",
    taskName: "Accounting audits (VD4832)",
    overDueAmount: "20,000 /-",

  },
];

// import AddIcon from "@mui/icons-material/Add";
// import { Fab, Menu, MenuItem } from "@mui/material";
// import { Box } from "@mui/system";
// import useTitle from "hooks/useTitle";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import DashboardInvoice from "views/invoicing/dashboard/DashboardInvoice";

// function Invoicing() {
//   useTitle("Invoice");
//   const navigate = useNavigate();
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleNewReceipt = () => { };

//   const handleNewEstimate = () => {
//     navigate("/invoicing/create-estimate");
//   };

//   const handleNewInvoice = () => {
//     navigate("/invoicing/create-invoice");
//   };

//   return (
//     <Box>
//       <DashboardInvoice />

//       <Fab
//         onClick={(e) => {
//           e.stopPropagation();
//           setAnchorEl(e.currentTarget);
//         }}
//         size="medium"
//         color="secondary"
//         sx={{
//           position: "fixed",
//           bottom: 40,
//           right: 40,
//           borderRadius: "8px",
//         }}
//         aria-label="add"
//       >
//         <AddIcon />
//       </Fab>

//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleClose}
//         onClick={handleClose}
//         anchorOrigin={{
//           vertical: "top",
//           horizontal: "left",
//         }}
//         transformOrigin={{
//           vertical: "bottom",
//           horizontal: "left",
//         }}
//       >
//         <MenuItem onClick={handleNewReceipt}>+ New Receipt</MenuItem>
//         <MenuItem onClick={handleNewInvoice}>+ New Invoice</MenuItem>
//         <MenuItem onClick={handleNewEstimate}>+ New Estimate</MenuItem>
//       </Menu>
//     </Box>
//   );
// }

// export default Invoicing;