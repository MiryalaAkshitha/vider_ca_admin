import { Box } from "@mui/material";
import { getClients } from "api/services/clients/clients";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useContext, useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import ClientsHeader from "views/billing/clients/ClientsHeader";
import { useNavigate } from "react-router-dom";
import { getCommonBilling } from "api/services/reports";
import { handleError } from "utils/handleError";
import { snack } from "components/toast";
import { UserProfileContext, useUserData } from "context/UserProfile";

const Billingclientoverview = () => {
  useTitle("Billing");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [clients, setClients] = useState<any[]>([]);
const { data: uData } = useContext(UserProfileContext);

  const { data, isLoading }: ResType = useQuery(
    [
      "clients",
      { limit: pageCount, offset: page * pageCount, query: { search } },
    ],
    getClients
  );
  const { data: result, error }: ResType = useQuery(
    ['clientslistinvoice', {
        query: 'clientslistinvoice',
        organizationid: uData.organization.id,search
}],
    getCommonBilling, {
    onSuccess: (result: any) => {
        setClients(result?.data);
        console.log(result?.data)
    },
    onError: (err: any) => {
        snack.error(handleError(err));
    },
}); 

const totalCount = data?.data?.totalCount || 0;

  const handleRowClick = (v: any) => {
    navigate(`/billing/clients/${v?.id}?tab=overview`);
  };

  return (
    <Box p={3}>
      <ClientsHeader search={search} setSearch={setSearch} />
      <Table
        pagination={{ totalCount, pageCount, setPageCount, page, setPage }}
        data={result?.data || []}
        columns={columns}
        loading={isLoading}
        onRowClick={handleRowClick}
      />
  </Box>

  );
};

let columns = [
  
  {
    key: "display_name",
    title: "Client Name",
    render : (row:any) => getTitle(row?.display_name),
  },
  {
    key: "category",
    title: "Category",
    render: (row: any) => getTitle(row?.category),
  },
  {
    key:"totaltasks",
    title:"Total Tasks",
    render: (row:any) =>getTitle(row?.totaltasks),
  },
  {
    key:"unbilledtasks",
    title:"Unbilled Tasks"
  },
  {
    key:"billedtasks",
    title: "Billed Tasks"
  },
  {
    key:"dueamount",
    title:"Amount Due"
  }

];


export default Billingclientoverview;
