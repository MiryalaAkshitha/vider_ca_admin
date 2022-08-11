import { Add, Delete, Visibility } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { deleteExpenditure, getExpenditure } from "api/services/expenditure";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import { formattedDate } from "utils/formattedDate";
import AddExpenditure from "./AddExpenditure";
import ViewExpenditure from "./ViewExpenditure";

function Expenditure() {
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);

  const { data, isLoading }: ResType = useQuery(
    ["user_expenditure", { type: "SELF", search }],
    getExpenditure
  );

  return (
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <SearchContainer value={search} onChange={setSearch} debounced />
        <Button
          onClick={() => setOpen(true)}
          startIcon={<Add />}
          color="secondary"
          variant="outlined"
        >
          Add Expenditure
        </Button>
      </Box>
      <Table
        sx={{ mt: 2 }}
        data={data?.data || []}
        loading={isLoading}
        columns={columns}
      />
      <AddExpenditure open={open} setOpen={setOpen} />
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
    title: "Client",
    key: "client.displayName",
  },
  {
    title: "Task",
    key: "task.name",
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

  const { mutate: delExpenditure } = useMutation(deleteExpenditure, {
    onSuccess: (res) => {
      snack.success("Expenditure deleted");
      queryClient.invalidateQueries("user_expenditure");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete?",
      action: () => {
        delExpenditure(data?.id);
      },
    });
  };

  return (
    <>
      <Box display="flex" gap={1}>
        <IconButton onClick={(e) => setOpen(true)}>
          <Visibility />
        </IconButton>
        <IconButton onClick={handleDelete}>
          <Delete />
        </IconButton>
      </Box>
      <ViewExpenditure open={open} setOpen={setOpen} data={data} />
    </>
  );
};

export default Expenditure;
