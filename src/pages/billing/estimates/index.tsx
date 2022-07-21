import { Add } from "@mui/icons-material";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import BrowserUpdatedOutlinedIcon from "@mui/icons-material/BrowserUpdatedOutlined";
import { Box, Button, Typography } from "@mui/material";
import { getEstimates } from "api/services/billing";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import Actions from "views/billing/estimates/Actions";
import { getStatusColor } from "views/billing/estimates/getStatusColor";

const Estimates = () => {
  useTitle("Estimates");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data, isLoading }: ResType = useQuery(
    ["estimates", { offset: page * limit, limit }],
    getEstimates
  );

  return (
    <>
      <Box p={3}>
        <Box
          mb={2}
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <SearchContainer value={search} onChange={setSearch} />
          <Box display="flex" gap={1}>
            <Button
              endIcon={<BrowserUpdatedOutlinedIcon fontSize="small" />}
              color="primary"
              variant="outlined"
            >
              Export
            </Button>
            <Button
              endIcon={<ArrowDropDownOutlinedIcon />}
              color="primary"
              variant="outlined"
              onClick={(e) => setAnchorEl(e.currentTarget)}
            >
              Actions
            </Button>
            <Button
              onClick={() => navigate("/billing/estimates/add")}
              variant="outlined"
              color="secondary"
              startIcon={<Add />}
            >
              Add Estimate
            </Button>
          </Box>
        </Box>
        <Table
          selection={{
            onSelect(selected) {},
          }}
          pagination={{
            pageCount: limit,
            totalCount: data?.data?.totalCount || 0,
            onPageCountChange(v) {
              setLimit(v);
            },
            onChange(page) {
              setPage(page);
            },
          }}
          data={data?.data?.result || []}
          columns={columns}
          loading={isLoading}
        />
      </Box>
      <Actions anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
    </>
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
    title: "Estimated amount",
  },
  {
    key: "estimateDate",
    title: "estimateDate",
  },
  {
    key: "estimateDueDate",
    title: "Due Date",
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
