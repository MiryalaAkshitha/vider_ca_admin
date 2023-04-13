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
import { useNavigate } from "react-router-dom";

const Estimates = () => {
  useTitle("Invoices");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [selected, setSelected] = useState<any[]>([]);

  const { data, isLoading }: ResType = useQuery(
    ["invoices", { offset: page * pageCount, limit: pageCount, search }],
    getInvoices
  );

  const handleRowClick = (v: any) => {
    window.open(`/billing/invoices/${v?.id}/preview`);
  };

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
    title: "Invoice amount",
  },
  {
    key: "invoiceDate",
    title: "Invoice Date",
    render: (row: any) => formattedDate(row.invoiceDate),

  },
  {
    key: "invoiceDueDate",
    title: "Due Date",
    render: (row: any) => formattedDate(row.invoiceDueDate),

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
          { row?.status == 'APPROVAL_PENDING' ? getTitle('invoiced') : getTitle(row?.status?.toLowerCase())}          
        </Typography>
      </Box>
    ),
  },
];

export default Estimates;
