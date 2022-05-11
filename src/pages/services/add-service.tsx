import { Box, Divider } from "@mui/material";
import { getCategories } from "api/services/categories";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import { useQuery, UseQueryResult } from "react-query";
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

function AddService() {
  const { data, isLoading }: UseQueryResult<CategoryResponse, Error> = useQuery(
    "categories",
    getCategories
  );

  useTitle("Services");

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <BreadCrumbs page="addService" />
      <Overview data={data} />
      <Divider sx={{ my: 5 }} />
      <ServiceType />
      <Divider sx={{ my: 5 }} />
      <MileStones />
      <Divider sx={{ my: 5 }} />
      <KnowYourServices />
    </Box>
  );
}

export default AddService;
