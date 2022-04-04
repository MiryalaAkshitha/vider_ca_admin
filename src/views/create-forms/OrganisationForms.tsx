import { Grid, Box, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import AddForm from "views/create-forms/AddForm";
import { createFormLanding } from "assets";
import useQueryParams from "hooks/useQueryParams";
import { FromNormalText, FormBoldText } from "./formStyles";

const OrganisationForms = () => {
  const { queryParams, setQueryParams } = useQueryParams();
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      style={{ height: "100%" }}
    >
      <Grid item>
        <img src={createFormLanding} alt="Create Form Landing Image" />
      </Grid>
      <Grid
        item
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <FormBoldText>There are no organization forms available</FormBoldText>
        <FromNormalText>Click on create form to add a new form</FromNormalText>
        <Button
          variant="contained"
          size="small"
          style={{
            width: "150px",
            margin: "1rem",
          }}
          color="secondary"
          onClick={() => {
            setQueryParams({
              ...queryParams,
              createForm: "true",
            });
          }}
        >
          Create Form
        </Button>
      </Grid>
      <AddForm />
    </Grid>
  );
};

export default OrganisationForms;
