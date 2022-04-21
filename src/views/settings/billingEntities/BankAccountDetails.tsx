import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import { useState } from "react";
import { useImmer } from "use-immer";
import AddBankAccountDetails from "./AddBankAccountDetails";
import BankAccountDetailsCard from "./BankAccountDetailsCard";

const BankAccountDetails = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useImmer<any>({});

  return (
    <>
      <Box mb={4} px={3} maxWidth={1400}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" color="primary">
            Bank account Details
          </Typography>
          <Button
            color="secondary"
            onClick={() => setOpen(true)}
            startIcon={<Add />}
          >
            Add new bank account
          </Button>
        </Box>
        {/* <NoItems
          title="There are no bank accounts added"
          img={emptyLicenses}
          btnTitle="Add bank account"
          btnAction={() => setOpen(true)}
          desc="Tap on add bank accounts to add a new bank account"
        /> */}
      </Box>

      <AddBankAccountDetails
        open={open}
        setOpen={setOpen}
        state={state}
        setState={setState}
      />
      <BankAccountDetailsCard />
    </>
  );
};
export default BankAccountDetails;
