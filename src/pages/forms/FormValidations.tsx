import { Add } from "@mui/icons-material";
import { Box, Fab, Grid } from "@mui/material";
import { getFormValidations } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddFormValidation from "views/forms/AddFormValidation";
import FormValidationCard from "views/forms/FormValidationCard";

const FormValidations = () => {
  const { data, isLoading }: ResType = useQuery(
    ["form-validations"],
    getFormValidations
  );
  const [open, setOpen] = useState(false);

  if (isLoading) return <Loader />;

  return (
    <Box px={3} py={2}>
      {data?.data?.length ? (
        <>
          <SearchContainer
            value={""}
            placeHolder="Search by name"
            width="400px"
            onChange={(v) => {}}
          />
          <Grid item container spacing={2} mt={2}>
            {data?.data?.map((item: any, index: number) => (
              <Grid item xs={3} sm={3} key={index}>
                <FormValidationCard data={item} />
              </Grid>
            ))}
          </Grid>
          <Fab
            onClick={() => {
              setOpen(true);
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
          title="There are no form validations available"
          btnTitle="Create form validation"
          btnAction={() => {
            setOpen(true);
          }}
          desc="Click on create to add a new form validation"
        />
      )}
      <AddFormValidation open={open} setOpen={setOpen} />
    </Box>
  );
};

export default FormValidations;
