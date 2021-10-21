import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getForms } from "api/forms";
import BreadCrumbs from "components/BreadCrumbs";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import CreateForm from "views/forms/AddForm";
import FormCard from "views/forms/FormCard";

export type FormItem = {
  id: number;
  name: string;
  tags: string[];
};

interface FormResponse {
  data: Array<FormItem>;
}

function Forms() {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading }: UseQueryResult<FormResponse, Error> = useQuery(
    ["forms"],
    getForms
  );

  useTitle("Forms");

  return (
    <>
      <BreadCrumbs page='forms' />
      <Box mt={3}>
        <Grid container>
          <Grid item xs={6}>
            <SearchContainer
              placeHolder='Search by form name or tags'
              onChange={(v) => setSearch(v)}
            />
          </Grid>
          <Grid item xs={6}>
            <Box textAlign='right'>
              <Button
                onClick={() => setOpen(true)}
                variant='outlined'
                startIcon={<Add />}
                color='secondary'>
                Create Form
              </Button>
            </Box>
          </Grid>
        </Grid>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {data?.data.length ? (
              <Grid container spacing={3} sx={{ mt: 2 }}>
                {data?.data
                  ?.filter((item) => {
                    return (
                      item.name.toLowerCase().indexOf(search.toLowerCase()) > -1
                    );
                  })
                  .map((item) => (
                    <Grid item xs={3} key={item.id}>
                      <FormCard data={item} />
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <EmptyPage minHeight='70vh' />
            )}
          </>
        )}
        <CreateForm open={open} setOpen={setOpen} />
      </Box>
    </>
  );
}

export default Forms;
