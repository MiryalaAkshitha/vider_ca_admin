import { Box, Grid } from "@mui/material";
import SearchContainer from "components/SearchContainer";
import FormCard from "views/formbuilder/FormCard";

const MyForms = () => {
  return (
    <Box px={3} py={2}>
      <SearchContainer
        value={""}
        placeHolder="Search by Name / Client Type"
        width={"450px"}
        onChange={(v) => {}}
      />
      <Grid item container spacing={2} mt={2}>
        <Grid item xs={3} sm={6}>
          <FormCard />
        </Grid>
        <Grid item xs={3} sm={6}>
          <FormCard />
        </Grid>
        <Grid item xs={3} sm={6}>
          <FormCard />
        </Grid>
        <Grid item xs={3} sm={6}>
          <FormCard />
        </Grid>
        <Grid item xs={3} sm={6}>
          <FormCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyForms;
