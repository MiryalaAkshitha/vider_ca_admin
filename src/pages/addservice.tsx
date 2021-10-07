import { Divider } from "@mui/material";
import { getCategories } from "api/categories";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import useTitle from "hooks/useTitle";
import { useQuery, UseQueryResult } from "react-query";
import Deliverables from "views/services/Deliverables";
import Documents from "views/services/Documents";
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
    <>
      <BreadCrumbs page='addService' />
      <Overview data={data} />
      <Divider sx={{ my: 5 }} />
      <ServiceType />
      <Divider sx={{ my: 5 }} />
      <Documents />
      <Divider sx={{ my: 5 }} />
      <Deliverables />
    </>
  );
}

export default AddService;
