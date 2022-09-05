import { Box } from "@mui/material";
import { getClients } from "api/services/clients/clients";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import ClientsHeader from "views/billing/clients/ClientsHeader";

const Clients = () => {
  useTitle("Billing");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [selected, setSelected] = useState<any[]>([]);

  const { data, isLoading }: ResType = useQuery(
    [
      "clients",
      { limit: pageCount, offset: page * pageCount, query: { search } },
    ],
    getClients
  );

  const totalCount = data?.data?.totalCount || 0;

  return (
    <Box p={3}>
      <ClientsHeader search={search} setSearch={setSearch} />
      <Table
        selection={{ selected, setSelected }}
        pagination={{ totalCount, pageCount, setPageCount, page, setPage }}
        data={data?.data?.result || []}
        columns={columns}
        loading={isLoading}
      />
    </Box>
  );
};

let columns = [
  {
    key: "clientId",
    title: "Client ID",
  },
  {
    key: "displayName",
    title: "Client Name",
  },
  {
    key: "category",
    title: "Category",
    render: (row: any) => getTitle(row?.category),
  },
];

export default Clients;
