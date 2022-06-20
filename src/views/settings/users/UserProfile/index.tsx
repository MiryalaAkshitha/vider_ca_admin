import Loader from "components/Loader";
import { Box } from "@mui/material";
import { getProfile } from "api/services/users";
import { useQuery } from "react-query";
import BankDetails from "./BankDetails";
import BasicDetails from "./BasicDetails";
import Specializations from "./Specializations";
import StatutoryInformation from "./StatutoryInformation";
import { ResType } from "types";
import { useParams } from "react-router-dom";
import ChangePassword from "./ChangePassword";

function UserProfile() {
  const params = useParams();
  const { data, isLoading }: ResType = useQuery(
    ["user-profile", params.userId],
    getProfile
  );

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ maxWidth: 1300, mx: "auto", mt: 3 }}>
      <BasicDetails data={data?.data} />
      <ChangePassword />
      <Specializations data={data?.data} />
      <StatutoryInformation data={data?.data} />
      <BankDetails data={data?.data} />
    </Box>
  );
}

export default UserProfile;
