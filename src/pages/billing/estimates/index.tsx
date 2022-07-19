import { Box, Button, Paper } from "@mui/material";
import EmptyPage from "components/EmptyPage";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BrowserUpdatedOutlinedIcon from "@mui/icons-material/BrowserUpdatedOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { Add } from "@mui/icons-material";

const Estimates = () => {
  useTitle("Estimates");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  if ([1].length === 0) {
    return (
      <EmptyPage
        title="There are no estimates available"
        btnTitle="Add new estimate"
        btnAction={() => navigate("/billing/estimates/add")}
        desc="Click on Add new estimate button to create a new estimate"
      />
    );
  }

  return (
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
        data={[]}
        columns={columns}
        loading={false}
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
  },
  {
    key: "client.displayName",
    title: "Estimate Date",
  },
  {
    key: "amount",
    title: "Estimated amount",
  },
  {
    key: "dueDate",
    title: "Due Date",
  },
  {
    key: "status",
    title: "Status",
  },
];

export default Estimates;
