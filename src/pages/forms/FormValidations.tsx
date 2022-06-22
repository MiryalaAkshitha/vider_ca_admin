import { Add } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
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
import ImportValidations from "views/forms/validations/ImportValidations";

const FormValidations = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openImport, setOpenImport] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["form-validations"],
    getFormValidations
  );

  const filteredData = useFilteredData(data?.data, ["name"], search);

  if (isLoading) return <Loader />;

  return (
    <Box px={3} py={2}>
      {data?.data?.length > 0 && (
        <Box display="flex" gap={1} justifyContent="space-between">
          <SearchContainer
            placeHolder="Search by name or tags"
            minWidth="400px"
            onChange={setSearch}
          />
          <Button
            onClick={() => setOpenImport(true)}
            variant="outlined"
            color="secondary"
            startIcon={<Add />}
          >
            Import from Vider
          </Button>
        </Box>
      )}
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
      {data?.data?.length === 0 && (
        <EmptyPage
          title="There are no form validations available"
          desc="Click on create to add a new form validation"
          btn2Title="Create"
          btn2Action={() => setOpen(true)}
          btnTitle="Import from Vider"
          btnAction={() => setOpenImport(true)}
        />
      )}
      <AddFormValidation open={open} setOpen={setOpen} />
      <ImportValidations open={openImport} setOpen={setOpenImport} />
    </Box>
  );
};

export default FormValidations;
