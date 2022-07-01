import { Box } from "@mui/material";
import useQueryParams from "hooks/useQueryParams";
import FormBuilder from "pages/forms/FormBuilder";
import KybAppbar from "views/client-view/KybInfo/KybAppbar";

function KybFormEdit() {
  const { queryParams } = useQueryParams();

  return (
    <Box pt={10}>
      <KybAppbar name={queryParams?.formName} page="Edit" />
      <FormBuilder />
    </Box>
  );
}

export default KybFormEdit;
