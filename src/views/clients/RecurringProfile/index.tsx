import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getRecurringProfiles } from "api/services/recurring";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ResType } from "types";
import {
  StyledRecurItemsContainer,
  StyledRecurProfileContainer,
  StyledRecurTasksContainer,
} from "../styles";
import RecurringProfileItem from "./RecurringProfileItem";
import RecurringTaskItem from "./RecurringTaskItem";

function RecurringProfile() {
  const params: any = useParams();
  const [activeIndex, setActiveIndex] = useState(0);

  const { data, isLoading }: ResType = useQuery(
    ["recurring-profiles", params.clientId],
    getRecurringProfiles
  );

  if (isLoading) return <Loader />;

  return (
    <>
      {data?.data?.length > 0 ? (
        <StyledRecurProfileContainer>
          <Grid container>
            <Grid item xs={4}>
              <StyledRecurItemsContainer>
                {data?.data?.map((item: any, index: number) => (
                  <RecurringProfileItem
                    data={item}
                    onClick={() => setActiveIndex(index)}
                    key={index}
                    active={activeIndex === index}
                    last={index === data?.data?.length - 1}
                  />
                ))}
              </StyledRecurItemsContainer>
            </Grid>
            <Grid item xs={8}>
              <StyledRecurTasksContainer>
                <Box mb={2}>
                  <Typography color="primary" variant="body2">
                    Recurring Tasks
                  </Typography>
                  <Divider sx={{ mt: 2 }} />
                </Box>
                {data?.data[activeIndex]?.recurringTasks ? (
                  data?.data[activeIndex]?.recurringTasks?.map(
                    (item: any, index: number) => (
                      <RecurringTaskItem data={item} key={index} />
                    )
                  )
                ) : (
                  <Box>
                    <Typography variant="subtitle2" color="gray">
                      No recurring tasks
                    </Typography>
                  </Box>
                )}
              </StyledRecurTasksContainer>
            </Grid>
          </Grid>
        </StyledRecurProfileContainer>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          minHeight="50vh"
          alignItems="center"
        >
          <Typography variant="subtitle2" color="gray">
            No recurring Profiles
          </Typography>
        </Box>
      )}
    </>
  );
}

export default RecurringProfile;
