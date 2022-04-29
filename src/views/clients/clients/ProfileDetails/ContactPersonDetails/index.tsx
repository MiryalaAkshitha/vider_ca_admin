import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
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
    <>
      <Typography color="primary" variant="subtitle2" sx={{ mb: 3 }}>
        Client user details
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          {data?.map((item: any, index: number) => (
            <ContactPerson key={index} data={item} />
          ))}
        </Box>
        <Box mt={3}>
          <Button
            onClick={() => setOpen(true)}
            variant="outlined"
            color="secondary"
            startIcon={<Add />}
          >
            Add New
          </Button>
        </Box>
      </Box>
      <AddContactPerson open={open} setOpen={setOpen} />
    </>
  );
}

export default ContactPersonDetails;
