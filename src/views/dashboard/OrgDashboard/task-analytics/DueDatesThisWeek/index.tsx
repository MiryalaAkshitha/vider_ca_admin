import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import { getTasksDueThisWeek } from "api/services/organization";
import Loader from "components/Loader";
import { format } from "date-fns";
import _ from "lodash";
import moment from "moment";
import { useQuery } from "react-query";
import { ResType } from "types";
import { StyledTaskBox } from "../../styles";
import DueCard from "./DueCard";

function DueDatesThisWeek() {
  const { data, isLoading }: ResType = useQuery(["task-due-this-week"], getTasksDueThisWeek);

  let grouped: any = _.groupBy(data?.data, "dueDate");

  let sorted = Object.keys(grouped).sort((a, b) => {
    return moment(b).diff(moment(a));
  });

  if (isLoading) return <Loader />;

  return (
    <StyledTaskBox sx={{ position: "absolute", left: 0, right: 0, height: "100%" }}>
      <header>
        <Typography variant="h6">Tasks Due This Week</Typography>
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
    </StyledTaskBox>
  );
}

export default DueDatesThisWeek;
