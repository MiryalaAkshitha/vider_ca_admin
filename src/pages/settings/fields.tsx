import { Grid } from "@mui/material";
import BreadCrumbs from "components/BreadCrumbs";
import useTitle from "hooks/useTitle";
import FieldsContainer from "views/forms/FieldsContainer";
import FormFieldsContainer from "views/forms/FormFieldsContainer";

function Fields() {
  useTitle("Forms");

  return (
    <>
      <BreadCrumbs page="fields" />
      <Grid container spacing={2}>
        <Grid item xs={7}>
          <FormFieldsContainer />
        </Grid>
        <Grid item xs={5}>
          <FieldsContainer />
        </Grid>
      </Grid>
    </>
  );
}

export default Fields;
