import { Add } from "@mui/icons-material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { getClients } from "api/services/clients/clients";
import { getCommonBilling } from "api/services/reports";
import SearchContainer from "components/SearchContainer";
import Table, { ColumnType } from "components/Table";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useConfirm } from "context/ConfirmDialog";

function BilledTasks() {
  useTitle("Clients");
  const params = useParams();

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState<number>(0);
  const [payload, setPayload] = useState({});
  const [data, setData] = useState();
  const [pageCount, setPageCount] = useState<number>(10);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [search, setSearch] = useState("");

  const [selected, setSelected] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    name: [],
    search: "",
  });

  const { data: result, isLoading, error }: ResType = useQuery(
    ['clientinvoicebilled', {
      query: 'clientinvoicebilled',
      clientId: params.clientId, search
    }],
    getCommonBilling, {
    onSuccess: (res: any) => {
      setData(res?.data);
    },
    onError: (err: any) => {
      snack.error(handleError(err));
    },
  });

  return (
    <Box px={3} pt={3}>
      <Box display="flex" gap={2}>
        <Box display="flex" flex={1} gap={2} alignItems="center">
          <SearchContainer value={search} onChange={setSearch} debounced />
        </Box>

      </Box>
      <Box sx={{ mt: 2 }}>
        <Table
          sx={{ mt: 3 }}
          loading={isLoading}
          data={data || []}
          columns={Columns}
        // pagination={{ page, setPage, pageCount, setPageCount }}
        />
      </Box>

    </Box>
  );
}

const Columns: Array<ColumnType> = [
  { key: "name", title: "Task Name" },
  { key: "tasknumber", title: "Task Number" },
  { key: "status", title: "Task Status" },
  { key: "invoice_date", title: "Invoice Date" },
  { key: "invoice_due_date", title: "Due Date" },
  { key: "amount", title: "Invoice Amount" },
];

const Actions = ({ data }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const confirm = useConfirm();

  const { mutate } = useMutation({
    onSuccess: () => {
      snack.success("Billing entity removed");
      setAnchorEl(null);
      queryClient.invalidateQueries("billing-entities");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
      setAnchorEl(null);
    },
  });

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSendRemainder = () => {
    console.log("send Remainder")
  };
  const handleGenerateReceipt = () => {
    console.log("generate receipt")
  }

  return (
    <>
      <IconButton
        onClick={(e) => {
          e.stopPropagation();
          setAnchorEl(e.currentTarget);
        }}
      >
        <MoreVertOutlinedIcon color="primary" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={handleSendRemainder}>Send Reminder</MenuItem>
        <MenuItem onClick={handleGenerateReceipt}>Generate Receipt</MenuItem>

        {/* <MenuItem onClick={handleDelete}>Delete</MenuItem> */}
      </Menu>
    </>
  );
};
export default BilledTasks;
