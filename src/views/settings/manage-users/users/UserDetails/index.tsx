import { Box } from "@mui/material";
import { getUser } from "api/services/users";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import BankDetails from "./BankDetails";
import BasicDetails from "./BasicDetails";
import Specializations from "./Specializations";
import StatutoryInformation from "./StatutoryInformation";

function UserDetails() {
  const params = useParams();
  const { data, isLoading }: ResType = useQuery(
    ["user-details", params.userId],
    getUser
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <BasicDetails data={data?.data} />
      <Specializations data={data?.data} />
      <StatutoryInformation data={data?.data} />
      <BankDetails data={data?.data} />
    </>
  );
}

export default UserDetails;