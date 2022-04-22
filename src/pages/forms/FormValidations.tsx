import { Box, Grid } from "@mui/material";
import { getFormValidations } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useFilteredData from "hooks/useFilteredData";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddFormValidation from "views/forms/validations/AddFormValidation";
import FormValidationCard from "views/forms/validations/FormValidationCard";

const FormValidations = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data, isLoading }: ResType = useQuery(
    ["form-validations"],
    getFormValidations
  );

  const filteredData = useFilteredData(data?.data, ["name"], search);

  if (isLoading) return <Loader />;

  if (!data?.data?.length) {
    return (
      <>
        <EmptyPage
          title="There are no form validations available"
          btnTitle="Create form validation"
          btnAction={() => {
            setOpen(true);
          }}
          desc="Click on create to add a new form validation"
        />
        <AddFormValidation open={open} setOpen={setOpen} />
      </>
    );
  }

  return (
    <Box px={3} py={2}>
      <SearchContainer
        placeHolder="Search by name"
        width="400px"
        onChange={setSearch}
      />
      <Grid item container spacing={2} mt={2}>
        {filteredData?.map((item: any, index: number) => (
          <Grid item xs={4} sm={4} key={index}>
            <FormValidationCard data={item} />
          </Grid>
        ))}
      </Grid>
      <FloatingButton
        position="right"
        onClick={() => {
          setOpen(true);
        }}
      />
      <AddFormValidation open={open} setOpen={setOpen} />
    </Box>
  );
};

export default FormValidations;
