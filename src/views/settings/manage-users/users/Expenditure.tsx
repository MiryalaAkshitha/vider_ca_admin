import { InfoOutlined, MoreVert, Visibility } from "@mui/icons-material";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { approveExpenditure, getExpenditure } from "api/services/expenditure";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import { getTitle } from "utils";
import { formattedDate } from "utils/formattedDate";
import ViewExpenditure from "views/settings/profile/Expenditure/ViewExpenditure";
import RejectExpenditureDialog from "views/taskview/expenditure/RejectExpenditureDialog";

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
    title: "Expense Type",
    key: "type",
    render: (row: any) => getTitle(row.type),
  },
  {
    title: "Created Date",
    key: "created_at",
    render: (row: any) => formattedDate(row?.createdAt),
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
    title: "Status",
    key: "status",
  },
  {
    title: "Actions",
    key: "",
    render: (row: any) => {
      return <Actions data={row} />;
    },
  },
];

const Actions = ({ data }) => {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [viewOpen, setViewOpen] = useState<boolean>(false);
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
      <Box display="flex" gap={1}>
        <IconButton onClick={() => setViewOpen(true)}>
          <Visibility />
        </IconButton>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreVert />
        </IconButton>
      </Box>
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
      <ViewExpenditure open={viewOpen} setOpen={setViewOpen} data={data} />
      <RejectExpenditureDialog open={open} setOpen={setOpen} data={data} />
    </>
  );
};

export default Expenditure;
