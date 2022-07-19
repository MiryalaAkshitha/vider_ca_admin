import { Box, Button } from "@mui/material";
import EmptyPage from "components/EmptyPage";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Estimates = () => {
  useTitle("Invoices");
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const handleAddNewEstimate = () => {
    navigate("/invoicing/create-estimate");
  };

  if (data.length === 0) {
    return (
      <EmptyPage
        title="There are no Estimate available"
        btn2Title="Add new estimate"
        btn2Action={handleAddNewEstimate}
        desc="Click on Add new estimate to add an estimate"
      />
    );
  }

  return (
    <Box p={3}>
      <Box mb={2}>
        <SearchContainer value={search} onChange={setSearch} />
      </Box>
      <Table data={data || []} columns={columns} loading={false} />
    </Box>
  );
};

let columns = [
  {
    key: "estimateNumber",
    title: "Estimate number",
  },
  {
    key: "client",
    title: "Client name",
  },
  {
    key: "estimateDate",
    title: "Estimate Date",
  },
  {
    key: "estimateAmount",
    title: "Estimate Amount",
  },
];

let data = [
  {
    estimateNumber: "INV365647",
    client: "Doris Riley",
    estimateDate: "11/09/2021",
    estimateAmount: "1852 /-",
  },
  {
    estimateNumber: "INV365647",
    client: "Doris Riley",
    estimateDate: "11/09/2021",
    estimateAmount: "1852 /-",
  },
  {
    estimateNumber: "INV365647",
    client: "Doris Riley",
    estimateDate: "11/09/2021",
    estimateAmount: "1852 /-",
  },
  {
    estimateNumber: "INV365647",
    client: "Doris Riley",
    estimateDate: "11/09/2021",
    estimateAmount: "1852 /-",
  },
  {
    estimateNumber: "INV365647",
    client: "Doris Riley",
    estimateDate: "11/09/2021",
    estimateAmount: "1852 /-",
  },
  {
    estimateNumber: "INV365647",
    client: "Doris Riley",
    estimateDate: "11/09/2021",
    estimateAmount: "1852 /-",
  },
];

export default Estimates;
