import { Attachment, InfoOutlined, MoreVert } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  approveExpenditure,
  getUserExpenditure,
} from "api/services/expenditure";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import { formattedDatetime } from "utils/formattedDateTime";
import RejectExpenditureDialog from "views/taskview/expenditure/RejectExpenditureDialog";

function Expenditure() {
  const params = useParams();
  const [search, setSearch] = useState("");

  const { data, isLoading }: ResType = useQuery(
    ["user_expenditure", { userId: params.userId, search }],
    getUserExpenditure
  );

  return (
    <>
      <SearchContainer
        value={search}
        onChange={setSearch}
        debounced
        placeHolder="Search by expense/task name"
      />
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
    title: "Created On",
    key: "createdAt",
    render: (row: any) => formattedDatetime(row?.task?.createdAt),
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
  {
    title: "Actions",
    key: "",
    render: (row: any) => {
      if (row.status !== "PENDING") return null;
      return <Actions data={row} />;
    },
  },
];

const Actions = ({ data }) => {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { mutate } = useMutation(approveExpenditure, {
    onSuccess: () => {
      snack.success("Expenditure approved");
      queryClient.invalidateQueries("user_expenditure");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleApprove = () => {
    confirm({
      msg: "Are you sure you want to approve this expenditure?",
      action: () => {
        mutate({
          id: data?.id,
        });
      },
    });
  };

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVert />
      </IconButton>
      <Menu
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
      >
        <MenuItem onClick={handleApprove}>Approve</MenuItem>
        <MenuItem onClick={() => setOpen(true)}>Reject</MenuItem>
      </Menu>
      <RejectExpenditureDialog open={open} setOpen={setOpen} data={data} />
    </>
  );
};

export default Expenditure;
