import { Box } from "@mui/material";
import Clients from "views/clients/clients";
import Nav from "views/clients/Nav";

function Index() {
  return (
    <Box p={3}>
      <Nav />
      <Clients />
    </Box>
  );
}

export default Index;
