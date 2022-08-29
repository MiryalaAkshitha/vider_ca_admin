import { Edit, InfoOutlined } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
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
import AddLead from "views/leads/AddLead";
import ConverLead from "views/leads/ConvertLead";
import EditLead from "views/leads/EditLead";
import ViewLead from "views/leads/ViewLead";

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
    onSuccess: (res) => {
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
          placeHolder="Search"
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

const Actions = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [convertOpen, setConvertOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);

  return (
    <>
      <Box display="flex" gap={1}>
        <IconButton
          size="small"
          onClick={() => {
            setSelectedLead(data);
            setInfoOpen(true);
          }}
        >
          <InfoOutlined />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            setSelectedLead(data);
            setOpen(true);
          }}
        >
          <Edit />
        </IconButton>
        <Button
          disabled={data?.status === "converted"}
          onClick={() => {
            setSelectedLead(data);
            setConvertOpen(true);
          }}
          sx={{ minWidth: 80 }}
          color="secondary"
        >
          {data?.status === "pending" ? "Convert" : "Converted"}
        </Button>
      </Box>
      <EditLead open={open} setOpen={setOpen} data={selectedLead} />
      <ConverLead open={convertOpen} setOpen={setConvertOpen} data={selectedLead} />
      <ViewLead open={infoOpen} setOpen={setInfoOpen} data={selectedLead} />
    </>
  );
};

const columns = [
  {
    key: "category",
    title: "Category",
    render: (rowData: any) => getTitle(rowData?.category),
  },
  {
    key: "subCategory",
    title: "Sub Category",
    render: (rowData: any) => getTitle(rowData?.subCategory),
  },
  { key: "name", title: "Name" },
  { key: "mobileNumber", title: "Mobile Number" },
  { key: "email", title: "Email" },
  {
    title: "Created On",
    key: "createdAt",
    render: (item: any) => (
      <Typography variant="body2" color="primary">
        {moment(item?.createdAt).format("DD-MM-YYYY")}
      </Typography>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    render: (rowData: any) => <Actions data={rowData} />,
  },
];

export default Leads;
