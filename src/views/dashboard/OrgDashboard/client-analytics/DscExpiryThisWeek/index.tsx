import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import { getDueDscRegisters } from "api/services/organization";
import Loader from "components/Loader";
import { format } from "date-fns";
import _ from "lodash";
import moment from "moment";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { StyledTaskBox } from "../../styles";
import DueCard from "./DueCard";

function DscExpiryThisWeek() {
  const navigate = useNavigate();

  const { data, isLoading }: ResType = useQuery(["due-dsc-registers"], getDueDscRegisters);

  let grouped: any = _.groupBy(data?.data, "expiryDate");

  let sorted = Object.keys(grouped).sort((a, b) => {
    return moment(a).diff(moment(b));
  });

  if (isLoading) return <Loader />;

  return (
    <StyledTaskBox sx={{ position: "absolute", left: 0, right: 0, height: "100%" }}>
      <header>
        <Typography variant="h6">DSC Expiry this week</Typography>
      </header>
      <main>
        {sorted?.map((date: any) => {
          return (
            <Box sx={{ display: "flex", gap: "30px", alignItems: "start" }}>
              <Box>
                <Typography variant="h5" color="primary">
                  {format(new Date(date), "dd")}
                </Typography>
                <Typography variant="caption" color="rgba(0,0,0,0.4)">
                  {format(new Date(date), "MMM")}
                </Typography>
              </Box>
              <Box flex={1}>
                {grouped[date]?.map((item: any) => {
                  return <DueCard data={item} />;
                })}
              </Box>
            </Box>
          );
        })}
      </main>
      <footer>
        <Typography variant="body2" color="secondary">
          View All
        </Typography>
        <IconButton color="secondary" size="small" onClick={() => navigate("/dsc-register")}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </footer>
    </StyledTaskBox>
  );
}

export default DscExpiryThisWeek;
