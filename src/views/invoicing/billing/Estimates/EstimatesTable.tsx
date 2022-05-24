import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { Button, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { useMenu } from "context/MenuPopover";
import useTitle from "hooks/useTitle";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const EstimatesTable = () => {
  useTitle("Invoice Table");
  const [, setSearch] = useState("");
  const navigate = useNavigate();

  const handleAddNewInvoice = () => {
    navigate("/invoicing/create-estimate");
  };

  return (
    <Box p={3}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          margin: "20px 0",
          justifyContent: "space-between",
        }}
      >
        <SearchContainer
          minWidth="400px"
          placeHolder="Search for estimate"
          onChange={setSearch}
        />
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleAddNewInvoice}
        >
          + Add new estimate
        </Button>
      </Box>
      <Table data={data || []} columns={columns} loading={false} />
    </Box>
  );
};

const TableActions = () => {
  const menu = useMenu();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    menu({
      target: e.currentTarget,
      position: "bottom-right",
      options: [
        {
          label: "Generate Invoice",
          action: () => {
          },
        },
        {
          label: "Generate Receipt",
          action: () => { },
        },
      ],
    });
  };

  return (
    <IconButton onClick={handleClick}>
      <MoreVertOutlinedIcon color="primary" />
    </IconButton>
  );
};

const columns = [
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
  {
    key: "actions",
    title: "Actions",
    render: () => <TableActions />,
  },
];

const data = [
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

export default EstimatesTable;
