import { Box } from "@mui/system";
import { useClientData } from "context/ClientData";
import { useEffect, useState } from "react";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "utils/permissons";
import ProfileImage from "views/client-view/ProfileDetails/ProfileImage";
import BasicInformation from "views/client-view/ProfileDetails/BasicInformation";
import OrganizationInformation from "views/client-view/ProfileDetails/OrganizationInformation";
import AddressDetails from "views/client-view/ProfileDetails/AddressDetails";
import ContactPersonDetails from "views/client-view/ProfileDetails/ContactPersonDetails";
import AdditionalInformation from "views/client-view/ProfileDetails/AdditionalInformation";
import Activity from "views/client-view/ProfileDetails/Acitivity";
import BottomBar from "views/client-view/ProfileDetails/BottomBar";

function ProfileDetails() {
  const [state, setState] = useState<any>({});
  const { data } = useClientData();

  useEffect(() => {
    setState(data?.data);
  }, [data]);

  return (
    <Box px={4} pt={2} pb={10}>
      <ProfileImage
        src={data?.data?.imageUrl}
        onChange={(v: string) => setState({ ...state, image: v })}
      />
      <BasicInformation data={state} setState={setState} />
      <OrganizationInformation
        data={state}
        setState={setState}
        apiData={data?.data}
      />
      <AddressDetails data={state} setState={setState} />
      <ContactPersonDetails data={data?.data?.contactPersons} />
      <AdditionalInformation
        data={state}
        setState={setState}
        apiData={data?.data}
      />
      <Activity />
      <ValidateAccess name={Permissions.EDIT_CLIENT_PROFILE}>
        <BottomBar data={data?.data} setState={setState} state={state} />
      </ValidateAccess>
    </Box>
  );
}

export default ProfileDetails;
