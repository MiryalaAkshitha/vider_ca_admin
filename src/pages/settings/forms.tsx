import { Add } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
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
  const [type, setType] = useState<string>("");

  const { data, isLoading }: ResType = useQuery(["forms"], getForms);

  const getFiltered = () => {
    let result = data?.data;
    if (search) {
      result = result?.filter((item: any) => {
        return item?.name?.toLowerCase().indexOf(search.toLowerCase()) > -1;
      });
    }
    if (type) {
      result = result?.filter((item: any) => item?.tags?.includes(type));
    }
    return result || [];
  };

  useTitle("Forms");

  return (
    <>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <Box display="flex" gap={2}>
              <SearchContainer
                placeHolder="Search by form name"
                onChange={(v) => setSearch(v)}
              />
              <TextField
                size="small"
                select
                label="Filter by type"
                onChange={(e) => setType(e.target.value)}
                sx={{ minWidth: 300 }}
              >
                <MenuItem value="">None</MenuItem>
                {["kyb", "passwords", "ddforms"].map(
                  (item: any, index: number) => (
                    <MenuItem value={item} key={index}>
                      {item}
                    </MenuItem>
                  )
                )}
              </TextField>
            </Box>
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
                {getFiltered().map((item: any) => (
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
