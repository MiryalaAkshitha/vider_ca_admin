import { Box, Typography } from "@mui/material";
import { getEstimates } from "api/services/billing/estimates";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useRef, useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import { formattedDate } from "utils/formattedDate";
import EstimatesHeader from "views/billing/estimates/EstimatesHeader";
import { getStatusColor } from "views/billing/estimates/getStatusColor";

const Estimates = () => {
  useTitle("Estimates");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(5);
  const [selected, setSelected] = useState<any[]>([]);
  const selectionRef = useRef<any>({});

  const { data, isLoading }: ResType = useQuery(
    ["estimates", { offset: page * pageCount, limit: pageCount, search }],
    getEstimates
  );

  const totalCount = data?.data?.totalCount || 0;

  return (
    <Box p={3}>
      <EstimatesHeader
        clearSelection={selectionRef.current?.clearSelection}
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
    key: "estimateNumber",
    title: "Estimate number",
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
    key: "estimateDate",
    title: "Invoice Date",
  },
  {
    key: "estimateDueDate",
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
