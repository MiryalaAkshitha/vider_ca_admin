import { Divider } from "@mui/material";
import { Box } from "@mui/system";
import { getOrganization, updateOrganization } from "api/services/organization";
import Loader from "components/Loader";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { useImmer } from "use-immer";
import AddressDetails from "views/settings/organization/OrganizationProfile/AddressDetails";
import BankAccounts from "views/settings/organization/OrganizationProfile/BankAccounts";
import ContactDetails from "views/settings/organization/OrganizationProfile/ContactDetails";
import GstDetails from "views/settings/organization/OrganizationProfile/GstDetails";
import OrganizationDetails from "views/settings/organization/OrganizationProfile/OrganizationDetails";
import OrganizationLicenses from "views/settings/organization/OrganizationProfile/Licenses";
import PrimaryContactDetails from "views/settings/organization/OrganizationProfile/PrimaryContactDetails";
import { snack } from "components/toast";
import BottomBar from "components/BottomBar";
import { aadharPattern, emailPattern, panCardPattern, phonePattern } from "utils/patterns";
import path from "path";

function OrganizationProfile() {
  const queryClient = useQueryClient();
  const [state, setState] = useImmer<any>({});

  const { data, isLoading }: ResType = useQuery(["organization"], getOrganization, {
    onSuccess: (res: any) => {
      setState(res.data);
    },
    cacheTime: 0,
  });

  const { mutateAsync } = useMutation(updateOrganization, {
    onSuccess: () => {
      snack.success("Organization Profile Updated");
      queryClient.invalidateQueries("organization");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onSubmit = async () => {
    const { logoUrl, ...data } = state;
    if (data.mobileNumber && !phonePattern.test(data.mobileNumber)) {
      return snack.error("Invalid mobile number");
    }
    // if (data.alternateMobileNumber && !phonePattern.test(data.alternateMobileNumber)) {
    //   return snack.error("Invalid mobile number");
    // }
    // if (data.primaryContactMobileNumber && !phonePattern.test(data.primaryContactMobileNumber)) {
    //   return snack.error("Invalid mobile number");
    // }
    // if (data.primaryContactEmail && !phonePattern.test(data.primaryContactEmail)) {
    //   return snack.error("Invalid email");
    // }

    await mutateAsync({ data });
  };

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ px: 3, pt: 3, pb: 10 }}>
      <OrganizationDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <ContactDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <GstDetails apiData={data?.data} state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <PrimaryContactDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <AddressDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <BankAccounts />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <OrganizationLicenses />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <BottomBar
        data={data?.data}
        state={state}
        onCancel={() => setState(data?.data)}
        onUpdate={onSubmit}
      />
    </Box>
  );
}

export default OrganizationProfile;
