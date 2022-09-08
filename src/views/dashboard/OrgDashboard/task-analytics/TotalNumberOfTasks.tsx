import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { Box, IconButton, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StyledTaskBox, Typography13 } from "../styles";

function TotalNumberOfTasks({ data }) {
  const navigate = useNavigate();
  const [more] = useState(true);

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Total number of tasks</Typography>
      </header>
      <main>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">{data?.total}</Typography>
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
              <Typography13>Than Last Week</Typography13>
            </Box>
          </Box>
        </Box>
      </main>
      <footer>
        <Typography variant="body2" color="secondary">
          View Tasks
        </Typography>
        <IconButton color="secondary" size="small" onClick={() => navigate("/task-board")}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </footer>
    </StyledTaskBox>
  );
}

export default TotalNumberOfTasks;
