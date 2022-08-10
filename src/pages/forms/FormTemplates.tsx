import { Add } from "@mui/icons-material";
import { Box, Button, Grid } from "@mui/material";
import { getForms } from "api/services/forms";
import EmptyPage from "components/EmptyPage";
import FloatingButton from "components/FloatingButton";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useFilteredData from "hooks/useFilteredData";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import AddForm from "views/forms/AddForm";
import FormCard from "views/forms/FormCard";
import ImportForms from "views/forms/ImportForms";

const MyForms = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [openImport, setOpenImport] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["forms", { type: "TEMPLATE" }],
    getForms
  );

  const filteredData = useFilteredData(data?.data, ["name", "tags"], search);

  if (isLoading) return <Loader />;

  return (
    <Box px={3} py={2}>
      {data?.data?.length > 0 && (
        <Box display="flex" gap={1} justifyContent="space-between">
          <SearchContainer
            value={search}
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
        {filteredData?.map((form: any, index: number) => (
          <Grid item xs={3} sm={6} key={index}>
            <FormCard data={form} />
          </Grid>
        ))}
      </Grid>
      {data?.data?.length > 0 && (
        <FloatingButton position="right" onClick={() => setOpen(true)} />
      )}
      {data?.data?.length === 0 && (
        <EmptyPage
          minHeight="70vh"
          title="There are no forms available"
          btnTitle="Import from Vider"
          btnAction={() => setOpenImport(true)}
          btn2Title="Create Form"
          btn2Action={() => setOpen(true)}
          desc="Click on create form to add a new form"
        />
      )}
      <AddForm open={open} setOpen={setOpen} />
      <ImportForms open={openImport} setOpen={setOpenImport} />
    </Box>
  );
};

export default MyForms;
