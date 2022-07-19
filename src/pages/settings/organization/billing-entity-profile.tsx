import { Box, Breadcrumbs, Divider, Typography } from "@mui/material";
import Loader from "components/Loader";
import { useImmer } from "use-immer";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import {
  getBillingEntityDetails,
  updateBillingEntity,
} from "api/services/billingEntity";
import { useParams } from "react-router-dom";
import ContactDetails from "views/settings/organization/OrganizationProfile/ContactDetails";
import GstDetails from "views/settings/organization/OrganizationProfile/GstDetails";
import PrimaryContactDetails from "views/settings/organization/OrganizationProfile/PrimaryContactDetails";
import AddressDetails from "views/settings/organization/OrganizationProfile/AddressDetails";
import BankAccounts from "views/settings/organization/OrganizationProfile/BankAccounts";
import OrganizationLicenses from "views/settings/organization/OrganizationProfile/Licenses";
import { LinkRouter } from "components/BreadCrumbs";
import { snack } from "components/toast";
import BottomBar from "components/BottomBar";
import OrganizationDetails from "views/settings/organization/OrganizationProfile/OrganizationDetails";
import { handleError } from "utils/handleError";

const BillingEntityProfile = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const [state, setState] = useImmer<any>({});

  const { data, isLoading }: ResType = useQuery(
    ["billing-entity", params.billingEntityId],

    getBillingEntityDetails,
    {
      onSuccess: (res: any) => {
        setState(res.data);
      },
      cacheTime: 0,
    }
  );

  const { mutateAsync } = useMutation(updateBillingEntity, {
    onSuccess: () => {
      snack.success("Billing Entity Profile Updated");
      queryClient.invalidateQueries("billing-entity");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const onSubmit = async () => {
    const { logoUrl, ...result } = state;
    await mutateAsync({ id: data?.data?.id, data: result });
  };

  if (isLoading) return <Loader />;

  return (
    <Box p={3}>
      <Breadcrumbs sx={{ mb: 3 }}>
        <LinkRouter
          underline="hover"
          color="inherit"
          to="/settings/billing-entities"
        >
          Billing Entities
        </LinkRouter>
        <Typography>{data?.data?.legalName}</Typography>
      </Breadcrumbs>
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
      <BottomBar
        data={data?.data}
        state={state}
        onCancel={() => setState(data?.data)}
        onUpdate={onSubmit}
      />
    </Box>
  );
};
export default BillingEntityProfile;
