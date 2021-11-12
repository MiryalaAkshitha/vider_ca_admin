import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import {
  StyledRecurItemsContainer,
  StyledRecurProfileContainer,
  StyledRecurTasksContainer,
} from "../styles";
import RecurringProfileItem from "./RecurringProfileItem";
import RecurringTaskItem from "./RecurringTaskItem";

function RecurringProfile() {
  return (
    <StyledRecurProfileContainer>
      <Grid container>
        <Grid item xs={4}>
          <StyledRecurItemsContainer>
            <RecurringProfileItem />
            <RecurringProfileItem active={true} />
            <RecurringProfileItem />
            <RecurringProfileItem />
            <RecurringProfileItem last={true} />
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
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
            <RecurringTaskItem />
          </StyledRecurTasksContainer>
        </Grid>
      </Grid>
    </StyledRecurProfileContainer>
  );
}

export default RecurringProfile;
