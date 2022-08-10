import { Attachment, InfoOutlined } from "@mui/icons-material";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { getExpenditure } from "api/services/expenditure";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";

function Expenditure() {
  const params: any = useParams();
  const [search, setSearch] = useState("");

  const { data, isLoading }: ResType = useQuery(
    ["user_expenditure", { type: "USER", userId: +params.userId, search }],
    getExpenditure
  );

  return (
    <>
      <SearchContainer value={search} onChange={setSearch} debounced />
      <Table
        sx={{ mt: 2 }}
        data={data?.data || []}
        loading={isLoading}
        columns={columns}
      />
    </>
  );
}

const columns = [
  {
    title: "Task ID",
    key: "task.taskNumber",
  },
  {
    title: "Task Name",
    key: "task.name",
  },
  {
    title: "Client Name",
    key: "task.client.displayName",
  },
  {
    title: "Category Name",
    key: "task.category.name",
  },
  {
    title: "Expense Type",
    key: "type",
    render: (row: any) => getTitle(row.type),
  },
  {
    title: "Particular name",
    key: "particularName",
  },
  {
    title: "Amount",
    key: "amount",
  },
  {
    title: "Attachment",
    key: "",
    render: (row: any) => {
      if (!row.attachment) return null;
      return (
        <a href={row?.attachmentUrl} target="_blank" rel="noopener noreferrer">
          <IconButton color="secondary">
            <Attachment />
          </IconButton>
        </a>
      );
    },
  },
  {
    title: "Status",
    key: "status",
    render: (row: any) => {
      return row?.status === "REJECTED" ? (
        <Box display="flex" gap={1}>
          {row?.status}{" "}
          <Tooltip
            title={
              <Typography variant="body2">{row?.rejectedReason}</Typography>
            }
          >
            <IconButton size="small">
              <InfoOutlined fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        row?.status
      );
    },
  },
];

export default Expenditure;
