import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import AddContactPerson from "./AddContactPerson";
import ContactPerson from "./ContactPerson";

type Props = {
  data: any;
};

function ContactPersonDetails({ data }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box mt={5}>
      <Typography color="primary" variant="h6" sx={{ mb: 1 }}>
        Client User Information
      </Typography>
      <Grid container spacing={2}>
        {data?.map((item: any, index: number) => (
          <Grid item xl={4} lg={6}>
            <ContactPerson key={index} data={item} />
          </Grid>
        ))}
      </Grid>
      <Box mt={2}>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          color="secondary"
          startIcon={<Add />}
        >
          Add New
        </Button>
      </Box>
      <AddContactPerson open={open} setOpen={setOpen} />
    </Box>
  );
}

export default ContactPersonDetails;
