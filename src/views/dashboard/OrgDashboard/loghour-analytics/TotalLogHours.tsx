import { Typography } from "@mui/material";
import { getTotalLogHours } from "api/services/organization";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { ResType } from "types";
import { StyledTaskBox } from "../styles";

function TotalLogHours() {
  const { queryParams } = useQueryParams();
  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    ["total-loghours", { dashboardType }],
    getTotalLogHours
  );

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
