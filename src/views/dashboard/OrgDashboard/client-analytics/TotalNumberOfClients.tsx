import { Box, IconButton, Typography } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useState } from "react";
import { StyledTaskBox } from "../styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";

function TotalNumberOfClients({ data }) {
  const navigate = useNavigate();
  const [more] = useState(true);

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Total number of clients</Typography>
      </header>
      <main>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">{data?.totalClients}</Typography>
          <Box
            sx={{
              display: "flex",
              gap: "6px",
              alignContent: "center",
              marginTop: "20px",
            }}
          >
            <Box
              sx={{
                borderRadius: "50%",
                height: "46px",
                width: "46px",
                backgroundColor: more ? "rgba(	136, 176, 83,.1)" : "#FFD9E1",
                justifyContent: "center",
                display: "flex",
                alignItems: "center",
              }}
            >
              {more ? <NorthIcon color="success" /> : <SouthIcon color="error" />}
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  color: more ? "rgba(136, 176, 83)" : "#FFD9E1",
                }}
              >
                {more ? "+ " : "- "} 25%
              </Typography>
              <Typography variant="caption" color="rgba(0,0,0,0.4)">
                Than Last Week
              </Typography>
            </Box>
          </Box>
        </Box>
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
