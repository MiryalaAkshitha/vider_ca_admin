import { Box } from "@mui/material";
import { getReceipts } from "api/services/billing/receipts";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { formattedDate } from "utils/formattedDate";
import ReceiptsHeader from "views/billing/receipts/ReceiptsHeader";
import { useNavigate } from "react-router-dom";

const Receipts = () => {
  useTitle("Receipts");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const [selected, setSelected] = useState<any[]>([]);

  const { data, isLoading }: ResType = useQuery(
    ["receipts", { offset: page * pageCount, limit: pageCount, search }],
    getReceipts
  );

  const totalCount = data?.data?.total || 0;

  const handleRowClick = (v: any) => {
    window.open(`/billing/receipts/${v?.id}/preview`);
  };

  return (
    <Box p={3}>
      <ReceiptsHeader
        clearSelection={() => setSelected([])}
        selected={selected}
        search={search}
        setSearch={setSearch}
      />
      <Table
        sx={{ height: 'calc(70vh - 10px)' }}
        selection={{ selected, setSelected }}
        pagination={{ totalCount, pageCount, setPageCount, page, setPage }}
        data={data?.data?.result || []}
        columns={columns}
        loading={isLoading}
        onRowClick={handleRowClick}
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
    render: (row: any) => (+row?.amount || 0) + (+row?.creditsUsed || 0),
  },
  {
    key: "createdAt",
    title: "Created On",
    render: (row: any) => formattedDate(row.createdAt),
  },
];

export default Receipts;
