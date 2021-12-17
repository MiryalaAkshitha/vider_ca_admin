import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getForms } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import CreateForm from "views/forms/AddForm";
import FormCard from "views/forms/FormCard";

function Forms() {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading }: ResType = useQuery(["forms"], getForms);

  useTitle("Forms");

  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <SearchContainer
              placeHolder="Search by form name"
              onChange={(v) => setSearch(v)}
            />
          </Grid>
          <Grid item xs={6}>
            <Box textAlign="right">
              <Button
                onClick={() => setOpen(true)}
                variant="outlined"
                startIcon={<Add />}
                color="secondary"
              >
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
                  ?.filter((item: any) => {
                    return (
                      item?.name?.toLowerCase().indexOf(search.toLowerCase()) >
                      -1
                    );
                  })
                  .map((item: any) => (
                    <Grid item xs={3} key={item.id}>
                      <FormCard data={item} />
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <EmptyPage minHeight="70vh" />
            )}
          </>
        )}
        <CreateForm open={open} setOpen={setOpen} />
      </Box>
    </>
  );
}

export default Forms;
