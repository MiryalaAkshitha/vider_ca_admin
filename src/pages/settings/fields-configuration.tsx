import { Add } from "@mui/icons-material";
import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { getFields } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery, UseQueryResult } from "react-query";
import AddField from "views/forms/AddField";
import FieldCard from "views/forms/FieldCard";

export type FieldItem = {
  id: number;
  name: string;
};

export interface FieldResponse {
  data: Array<FieldItem>;
}

function Fields() {
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const { data, isLoading }: UseQueryResult<FieldResponse, Error> = useQuery(
    ["fields"],
    getFields
  );

  useTitle("Fields Configuration");

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <SearchContainer
            value={search}
            placeHolder="Search by field name"
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
              Add Field
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
                    <FieldCard data={item} />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <EmptyPage minHeight="70vh" />
          )}
        </>
      )}
      <AddField open={open} setOpen={setOpen} />
    </div>
  );
}

export default Fields;
