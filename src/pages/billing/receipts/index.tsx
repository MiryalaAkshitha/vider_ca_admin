import { Box } from "@mui/material";
import { getReceipts } from "api/services/billing/receipts";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { formattedDate } from "utils/formattedDate";
import ReceiptsHeader from "views/billing/receipts/ReceiptsHeader";

const Receipts = () => {
  useTitle("Receipts");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [selected, setSelected] = useState<any[]>([]);

  const { data, isLoading }: ResType = useQuery(
    ["receipts", { offset: page * pageCount, limit: pageCount, search }],
    getReceipts
  );

  const totalCount = data?.data?.totalCount || 0;

  return (
    <Box p={3}>
      <ReceiptsHeader search={search} setSearch={setSearch} />
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
    key: "receiptNumber",
    title: "Receipt number",
  },
  {
    key: "receiptDate",
    title: "Receipt Date",
    render: (row: any) => formattedDate(row?.receiptDate),
  },
  {
    key: "client.displayName",
    title: "Client Name",
  },
  {
    key: "amount",
    title: "Amount",
  },
  {
    key: "createdAt",
    title: "Created On",
    render: (row: any) => formattedDate(row.createdAt),
  },
];

export default Receipts;
