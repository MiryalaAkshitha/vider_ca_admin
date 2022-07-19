import { Add } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { getBankAccounts } from "api/services/organization";
import { emptyLicenses } from "assets";
import Loader from "components/Loader";
import NoItems from "components/NoItems";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddBankAccount from "./AddBankAccount";
import BankAccountCard from "./BankAccountCard";

const BankAccounts = () => {
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const queryKey = params.billingEntityId
    ? "billing-entity-bank-accounts"
    : "bank-accounts";

  const { data, isLoading }: ResType = useQuery(
    [queryKey, { billingEntityId: params.billingEntityId }],
    getBankAccounts
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box mb={4}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" color="primary">
            Bank account Details
          </Typography>
          {data?.data?.length > 0 && (
            <Button
              color="secondary"
              onClick={() => setOpen(true)}
              startIcon={<Add />}
            >
              Add new bank account
            </Button>
          )}
        </Box>
        <Box mt={2}>
          {data?.data?.length > 0 ? (
            <Grid container spacing={2}>
              {data.data.map((item: any, index: number) => (
                <Grid item xs={6} key={index}>
                  <BankAccountCard data={item} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <NoItems
              title="There are no bank accounts added"
              img={emptyLicenses}
              btnTitle="Add bank account"
              btnAction={() => setOpen(true)}
              desc="Tap on add bank accounts to add a new bank account"
            />
          )}
        </Box>
      </Box>
      <AddBankAccount open={open} setOpen={setOpen} />
    </>
  );
};
export default BankAccounts;
