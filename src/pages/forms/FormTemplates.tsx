import { Box, Grid } from "@mui/material";
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

const MyForms = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading }: ResType = useQuery(["forms"], getForms);
  const [search, setSearch] = useState("");

  const filteredData = useFilteredData(data?.data, ["name", "tags"], search);

  if (isLoading) return <Loader />;

  if (!data?.data?.length) {
    return (
      <>
        <EmptyPage
          title="There are no forms available"
          btnTitle="Create Form"
          btnAction={() => {
            console.log("something");
            setOpen(true);
          }}
          desc="Click on create form to add a new form"
        />
        <AddForm open={open} setOpen={setOpen} />
      </>
    );
  }

  return (
    <Box px={3} py={2}>
      <SearchContainer
        placeHolder="Search by Name / Client Type"
        width={"450px"}
        onChange={setSearch}
      />
      <Grid item container spacing={2} mt={2}>
        {filteredData?.map((form: any, index: number) => (
          <Grid item xs={3} sm={6} key={index}>
            <FormCard data={form} />
          </Grid>
        ))}
      </Grid>
      <FloatingButton position="right" onClick={() => setOpen(true)} />
      <AddForm open={open} setOpen={setOpen} />
    </Box>
  );
};

export default MyForms;
