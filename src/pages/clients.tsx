import { Add } from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/categories";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useQuery, UseQueryResult } from "react-query";
import { Link } from "react-router-dom";
import ServiceCard from "views/services/ServiceCard";

function Clients() {
  useTitle("Clients");

  return (
    <Box textAlign='right' mt={2}>
      <Link to='/services/add' style={{ textDecoration: "none" }}>
        <Button variant='outlined' startIcon={<Add />} color='secondary'>
          Add Client
        </Button>
      </Link>
      <Table sx={{ mt: 5 }} columns={["Name", "Mobile Number", "Email"]}>
        <tr>
          <td>Vinay Kumar</td>
          <td>950533509</td>
          <td>vinay@janaspandana.in</td>
        </tr>
        <tr>
          <td>Vinay Kumar</td>
          <td>950533509</td>
          <td>vinay@janaspandana.in</td>
        </tr>
        <tr>
          <td>Vinay Kumar</td>
          <td>950533509</td>
          <td>vinay@janaspandana.in</td>
        </tr>
      </Table>
    </Box>
  );
}

export default Clients;
