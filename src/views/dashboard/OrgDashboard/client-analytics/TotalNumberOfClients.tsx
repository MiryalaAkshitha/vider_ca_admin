import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTaskBox } from "../styles";

function TotalNumberOfClients({ data }) {
  const navigate = useNavigate();

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Total number of clients</Typography>
      </header>
      <main>
        <Typography mb={3} variant="h2" color="primary">
          {data?.totalClients}
        </Typography>
      </main>
      <footer>
        <Typography variant="body2" color="secondary">
          View Clients
        </Typography>
        <IconButton color="secondary" size="small" onClick={() => navigate("/clients")}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </footer>
    </StyledTaskBox>
  );
}

export default TotalNumberOfClients;
