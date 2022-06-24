import EmptyPage from "components/EmptyPage";
import BillingEntityTable from "views/settings/billingEntities/BillingEntityTable";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getBillingEntity } from "api/services/billingEntity";
import AddBillingEntities from "views/settings/billingEntities/AddBillingEntities";
import Loader from "components/Loader";

const BillingEntities = () => {
  useTitle("BillingEntity");
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: ResType = useQuery(
    ["billing-entities"],
    getBillingEntity
  );

  if (isLoading) return <Loader />;

  return (
    <>
      {!data?.data?.length ? (
        <>
          <EmptyPage
            title="There are no Billing Entities"
            btn2Title="Add New Billing Entity"
            btn2Action={() => setOpen(true)}
            desc="Click on Add New Billing Entity to add a Billing Entity"
          />
          <AddBillingEntities open={open} setOpen={setOpen} />{" "}
        </>
      ) : (
        <BillingEntityTable data={data} isLoading={isLoading} />
      )}
    </>
  );
};

export default BillingEntities;
