import { Box, Button, Fab, Grid } from "@mui/material";
import { getForms } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import SearchContainer from "components/SearchContainer";
import { useQuery } from "react-query";
import AddForm from "views/forms/AddForm";
import FormCard from "views/forms/FormCard";
import useQueryParams from "hooks/useQueryParams";
import Loader from "components/Loader";
import { ResType } from "types";
import { Add } from "@mui/icons-material";

const MyForms = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  const { data, isLoading }: ResType = useQuery(["forms"], getForms);

  if (isLoading) return <Loader />;

  return (
    <Box px={3} py={2}>
      {data?.data?.length ? (
        <>
          <SearchContainer
            value={""}
            placeHolder="Search by Name / Client Type"
            width={"450px"}
            onChange={(v) => {}}
          />
          <Grid item container spacing={2} mt={2}>
            {data?.data?.map((form: any, index: number) => (
              <Grid item xs={3} sm={6} key={index}>
                <FormCard data={form} />
              </Grid>
            ))}
          </Grid>
          <Fab
            onClick={() => {
              setQueryParams({
                ...queryParams,
                createForm: "true",
              });
            }}
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
        </>
      ) : (
        <EmptyPage
          title="There are no forms available"
          btnTitle="Create Form"
          btnAction={() => {
            setQueryParams({
              ...queryParams,
              createForm: "true",
            });
          }}
          desc="Click on create form to add a new form"
        />
      )}
      <AddForm />
    </Box>
  );
};

export default MyForms;
