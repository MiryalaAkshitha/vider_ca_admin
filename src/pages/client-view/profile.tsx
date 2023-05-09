import Button from "@mui/material/Button";
import { Box } from "@mui/system";
import { bulkDelete } from "api/services/clients/clients";
import ValidateAccess from "components/ValidateAccess";
import { useClientData } from "context/ClientData";
import { Permissions } from "data/permissons";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import Activity from "views/client-view/ProfileDetails/Acitivity";
import AdditionalInformation from "views/client-view/ProfileDetails/AdditionalInformation";
import AddressDetails from "views/client-view/ProfileDetails/AddressDetails";
import BasicInformation from "views/client-view/ProfileDetails/BasicInformation";
import BottomBar from "views/client-view/ProfileDetails/BottomBar";
import ContactPersonDetails from "views/client-view/ProfileDetails/ContactPersonDetails";
import OrganizationInformation from "views/client-view/ProfileDetails/OrganizationInformation";
import ProfileImage from "views/client-view/ProfileDetails/ProfileImage";
import { useConfirm } from "context/ConfirmDialog";
import { snack } from "components/toast";
import { useParams, useNavigate } from "react-router-dom";
import { handleError } from "utils/handleError";
import { FormControlLabel, Switch } from "@mui/material";
import BillingAddressDetails from "views/client-view/ProfileDetails/BillingAddressDetails";
import ShippingAddressDetails from "views/client-view/ProfileDetails/ShippingAddressDetails";
import CopyAddressDetails from "views/client-view/ProfileDetails/CopyAddressDetails";
import LocaldirectorypathDetails from "views/client-view/ProfileDetails/Localdirectorypath";

function ProfileDetails() {
  const [originalState, setOriginalState] = useState<any>({});
  const [state, setState] = useState<any>({});
  const { data } = useClientData();
  const queryClient = useQueryClient();
  const confirm = useConfirm();
  const { clientId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    let result = {
      ...data?.data,
      clientManager: data?.data?.clientManager?.id || "",
    };
    setOriginalState(result);
    setState(result);
  }, [data]);

  const { mutate } = useMutation(bulkDelete, {
    onSuccess: () => {
      snack.success(`${data?.data?.displayName} Client Profile has been Deleted`);
      queryClient.invalidateQueries("clients");
      navigate("/clients");
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete the client?",
      action: () => {
        mutate({ ids: [clientId] });
      },
    });
  };

  return (
    <Box px={4} pt={2} pb={10}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <ProfileImage
          src={data?.data?.imageUrl}
          onChange={(v: string) => setState({ ...state, image: v })}
        />
        <Box display="flex" gap={2}>
          {/* <FormControlLabel
            label="Client Portal Access"
            control={
              <Switch
                onChange={(e) => setState({ ...state, clientPortalAccess: e.target.checked })}
                checked={state?.clientPortalAccess || false}
              />
            }
          /> */}
          <Button variant="outlined" color="error" onClick={handleDelete}>
            Delete Client
          </Button>
        </Box>
      </Box>
      <BasicInformation data={state} setState={setState}/>
      <OrganizationInformation data={state} setState={setState} apiData={data?.data} />
      <AddressDetails data={state} setState={setState} />
      <CopyAddressDetails data={state} setState={setState} />
      <BillingAddressDetails data={state} setState={setState} />
      {/* <ShippingAddressDetails data={state} setState={setState} /> */}
      <ContactPersonDetails data={data?.data?.contactPersons} />
      <LocaldirectorypathDetails state={state} data={state} setState={setState} apiData={data?.data} />
      <AdditionalInformation data={state} setState={setState} apiData={data?.data} />
      <ValidateAccess name={Permissions.EDIT_CLIENT_PROFILE}>
        <BottomBar data={originalState} setState={setState} state={state} />
      </ValidateAccess>
    </Box>
  );
}

export default ProfileDetails;
