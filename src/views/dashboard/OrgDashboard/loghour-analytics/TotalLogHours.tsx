import { Box, Typography } from "@mui/material";
import NorthIcon from "@mui/icons-material/North";
import SouthIcon from "@mui/icons-material/South";
import { useState } from "react";
import { StyledTaskBox } from "../styles";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getTotalLogHours } from "api/services/organization";
import Loader from "components/Loader";

function TotalLogHours() {
  const [more] = useState(true);

  const { data, isLoading }: ResType = useQuery(["total-loghours"], getTotalLogHours);

  if (isLoading) return <Loader />;

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Total log hours</Typography>
      </header>
      <main>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h4">{data?.data}</Typography>
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
    </StyledTaskBox>
  );
}

export default TotalLogHours;
