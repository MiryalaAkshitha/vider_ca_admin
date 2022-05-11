import { Box } from "@mui/system";
import { useClientData } from "context/ClientData";
import { useEffect, useState } from "react";
import Activity from "./Acitivity";
import AddressDetails from "./AddressDetails";
import BasicInformation from "./BasicInformation";
import BottomBar from "./BottomBar";
import ContactPersonDetails from "./ContactPersonDetails";
import AdditionalInformation from "./AdditionalInformation";
import ProfileImage from "./ProfileImage";
import OrganizationInformation from "./OrganizationInformation";

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
      <BottomBar data={data?.data} setState={setState} state={state} />
    </Box>
  );
}

export default ProfileDetails;
