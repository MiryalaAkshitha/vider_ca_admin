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
        <Typography color="primary" variant="h2">
          {data?.data}
        </Typography>
      </main>
    </StyledTaskBox>
  );
}

export default TotalLogHours;
