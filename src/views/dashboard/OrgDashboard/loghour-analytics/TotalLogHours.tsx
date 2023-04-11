import { Typography } from "@mui/material";
import { getTotalLogHours } from "api/services/organization";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { ResType } from "types";
import { StyledTaskBox } from "../styles";
import DateRange from "../DateRange";
import { useState } from "react";

function TotalLogHours() {
  const { queryParams } = useQueryParams();
  const [dates, setDates] = useState({ fromDate: null, toDate: null });

  const dashboardType = queryParams.type || "user";

  const { data, isLoading }: ResType = useQuery(
    ["total-loghours", { dashboardType }],
    getTotalLogHours
  );

  if (isLoading) return <Loader />;

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Total Log Hours</Typography>
        <DateRange dates={dates} setDates={setDates} />
      </header>
      <main>
        <Typography color="primary" variant="h2">
          {data?.data}
          {console.log(data ,'total-loghours')}
        </Typography>
      </main>
    </StyledTaskBox>
  );
}

export default TotalLogHours;
