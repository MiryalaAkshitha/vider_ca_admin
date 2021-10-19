import { Divider, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getCategories } from "api/categories";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import { useQuery, UseQueryResult } from "react-query";
import FieldsContainer from "views/forms/FieldsContainer";
import KnowYourServices from "views/services/know";
import MileStones from "views/services/milestones";
import Overview from "views/services/overview";
import ServiceType from "views/services/servicetype";

interface Category {
  name: string;
  image: string;
  subCategories: [];
}

interface CategoryResponse {
  data: Category[];
}

function Fields() {
  useTitle("Forms");
  return (
    <>
      <BreadCrumbs page='fields' />
      <Box
        sx={{
          maxWidth: 1400,
          mx: "auto",
          mt: 5,
          borderRadius: 4,
          boxShadow: "0px 5px 20px #0000001A",
          minHeight: 600,
        }}>
        <Grid container>
          <Grid item xs={6}>
            <Box p={2}>
              <Typography variant='subtitle1' color='primary'>
                GST - Fields
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <FieldsContainer />
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Fields;
