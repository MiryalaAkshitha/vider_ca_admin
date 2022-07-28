import { Box, Typography } from "@mui/material";
import { getInvoices } from "api/services/billing/invoices";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import { formattedDate } from "utils/formattedDate";
import { getStatusColor } from "views/billing/estimates/getStatusColor";
import InvoicesHeader from "views/billing/invoices/InvoicesHeader";

const Estimates = () => {
  useTitle("Invoices");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [selected, setSelected] = useState<any[]>([]);

  const { data, isLoading }: ResType = useQuery(
    ["invoices", { offset: page * pageCount, limit: pageCount, search }],
    getInvoices
  );

  const totalCount = data?.data?.totalCount || 0;

  return (
    <Box p={3}>
      <InvoicesHeader
        clearSelection={() => setSelected([])}
        selected={selected}
        search={search}
        setSearch={setSearch}
      />
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
    key: "invoiceNumber",
    title: "Invoice number",
  },
  {
    key: "billingEntity.legalName",
    title: "Billing Entity",
    width: "20%",
  },
  {
    key: "client.displayName",
    title: "Client Name",
  },
  {
    key: "grandTotal",
    title: "Estimated amount",
  },
  {
    key: "invoiceDate",
    title: "Estimate Date",
  },
  {
    key: "invoiceDueDate",
    title: "Due Date",
  },
  {
    key: "createdAt",
    title: "Created On",
    render: (row: any) => formattedDate(row.createdAt),
  },
  {
    key: "status",
    title: "Status",
    render: (row: any) => (
      <Box
        sx={{
          background: getStatusColor(row?.status),
          px: 2,
          py: "4px",
          color: "white",
          borderRadius: "10px",
          textAlign: "center",
          display: "inline-flex",
        }}
      >
        <Typography variant="body2">
          {getTitle(row?.status?.toLowerCase())}
        </Typography>
      </Box>
    ),
  },
];

export default Estimates;
