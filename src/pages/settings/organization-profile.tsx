import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { getOrganization } from "api/services/organization";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { ResType } from "types";
import { useImmer } from "use-immer";
import AddressDetails from "views/settings/organization/AddressDetails";
import BottomBar from "views/settings/organization/BottomBar";
import ContactDetails from "views/settings/organization/ContactDetails";
import GstDetails from "views/settings/organization/GstDetails";
import OrganizationDetails from "views/settings/organization/OrganizationDetails";
import OrganizationLicenses from "views/settings/organization/OrganizationLicenses";
import PrimaryContactDetails from "views/settings/organization/PrimaryContactDetails";

function OrganizationProfile() {
  const [state, setState] = useImmer<any>({});

  const { data, isLoading }: ResType = useQuery(
    ["organization"],
    getOrganization,
    {
      onSuccess: (res: any) => {
        setState(res.data);
      },
      cacheTime: 0,
    }
  );

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ mx: -3, pb: 10 }}>
      <OrganizationDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <ContactDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <GstDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <PrimaryContactDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <AddressDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <OrganizationLicenses />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <BottomBar state={state} setState={setState} data={data} />
    </Box>
  );
}

export default OrganizationProfile;
