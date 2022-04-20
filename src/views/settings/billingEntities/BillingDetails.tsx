import BasicDetails from "./BasicDetails";
import { Divider } from "@mui/material";
import Loader from "components/Loader";
import { useImmer } from "use-immer";
import BankAccountDetails from "./BankAccountDetails";
import PrimaryContactDetails from "./PrimaryContactDetails";
import GstInformation from "./GSTinformation";
import ContactInformation from "./contactInformation";
import AddressInformation from "./AddressInformation";
import EntityDocuments from "./EntityDocuments";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getBillingEntityDetails } from "api/services/billingEntity";
import { useParams } from "react-router-dom";
import BottomBar from "./BottomBar";

const BillingDetails = () => {
  const params = useParams();
  const [state, setState] = useImmer<any>({});

  const { data, isLoading }: ResType = useQuery(
    ["billing-entities", params.billingId],

    getBillingEntityDetails,
    {
      onSuccess: (res: any) => {
        setState(res.data);
      },
      cacheTime: 0,
    }
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <BasicDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <BankAccountDetails />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <PrimaryContactDetails state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <GstInformation state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <ContactInformation state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <AddressInformation state={state} setState={setState} />
      <Divider sx={{ my: 4, borderWidth: 2, borderColor: "#F5F5F5" }} />
      <EntityDocuments />
      <BottomBar state={state} setState={setState} data={data} />
    </>
  );
};
export default BillingDetails;
