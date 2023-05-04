import { Box, Button, Typography } from "@mui/material";
import { deleteLeads, getLeads } from "api/services/clients/clients";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import Actions from "views/leads/Actions";
import AddLead from "views/leads/AddLead";
import { CLIENT_CATEGORIES } from "data/constants";

function Leads() {
  useTitle("Leads");
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [page, setPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(10);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<any[]>([]);

  const { isLoading, data }: ResType = useQuery(
    ["leads", { limit: pageCount, offset: page * pageCount, search }],
    getLeads
  );

  const { mutate } = useMutation(deleteLeads, {
    onSuccess: () => {
      snack.success("Leads Deleted");
      queryClient.invalidateQueries("leads");
      setSelected([]);
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete selected leads?",
      action: () => {
        mutate(selected.map((c: any) => c?.id));
      },
    });
  };

  const totalCount = data?.data?.totalCount;

  return (
    <Box p={3}>
      <Box mb={2} display="flex" justifyContent="space-between">
        <SearchContainer
          value={search}
          debounced
          minWidth="400px"
          onChange={setSearch}
          placeHolder="Search by Lead Name"
        />
        {selected.length > 0 && (
          <Button onClick={handleDelete} variant="outlined" color="secondary">
            Delete
          </Button>
        )}
      </Box>
      <Table
        data={data?.data?.data || []}
        columns={columns}
        loading={isLoading}
        selection={{ selected, setSelected }}
        pagination={{ totalCount, pageCount, setPageCount, page, setPage }}
      />
      <FloatingButton onClick={() => setOpen(true)} />
      <AddLead open={open} setOpen={() => setOpen(false)} />
    </Box>
  );
}

const columns = [
  { key: "name", title: "Lead Name" },
  {
    key: "category",
    title: "Category",
    render: (rowData) => {
      return (
        <>
          {
            CLIENT_CATEGORIES.map((item: any) => {
              return item.value == rowData?.category ? item.label : '';
            })
          }
        </>
      )
    },
  },
  {
    key: "subCategory",
    title: "Sub Category",
    render: (rowData: any) => getTitle(rowData?.subCategory),
  },
  { key: "mobileNumber", title: "Mobile Number" },
  { key: "email", title: "Email ID" },
  {
    title: "Created On",
    key: "createdAt",
    render: (item: any) => moment(item?.createdAt).format("DD-MM-YYYY"),
  },
  {
    key: "actions",
    title: "Actions",
    render: (rowData: any) => <Actions data={rowData} />,
  },
];

export default Leads;
