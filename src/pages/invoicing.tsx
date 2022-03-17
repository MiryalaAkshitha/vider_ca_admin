import { useState } from "react";
import { Add } from "@mui/icons-material";

import { Fab } from "@mui/material";
import { Box } from "@mui/system";

import useTitle from "hooks/useTitle";
// import InvoiceDashboardMenu from "views/invoicing/dashboard/InvoiceDashboardMenu";
import { CreateInvoice } from "views/invoicing/createInvoice/CreateInvoice";
import DashboardInvoice from "views/invoicing/dashboard/DashboardInvoice";

function Invoicing() {
  useTitle("Invoice");

  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? (
        <CreateInvoice setOpen={setOpen} />
      ) : (
        <Box>
          <DashboardInvoice />
          <Fab
            onClick={() => setOpen(true)}
            size="medium"
            color="secondary"
            sx={{
              position: "fixed",
              bottom: 40,
              right: 40,
              borderRadius: "8px",
            }}
            aria-label="add"
          >
            <Add />
          </Fab>
        </Box>
      )}
    </>
  );
}

export default Invoicing;
