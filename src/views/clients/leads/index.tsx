import { Delete, Edit, InfoOutlined } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { deleteLeads, getLeads } from "api/services/client";
import { useConfirm } from "context/ConfirmDialog";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
import { useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";
import Nav from "../Nav";
import AddLead from "./AddLead";
import ConverLead from "./ConvertLead";
import EditLead from "./EditLead";
import ViewLead from "./ViewLead";

function Leads() {
  useTitle("Leads");
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number>(5);
  const [offset, setOffset] = useState<number>(0);
  const [open, setOpen] = useState(false);
  const selectionRef = useRef<any>({});

  const { isLoading, data }: ResType = useQuery(
    ["leads", { limit: limit, offset: offset * limit, search }],
    getLeads
  );

  const { mutate } = useMutation(deleteLeads, {
    onSuccess: (res) => {
      snack.success("Leads Deleted");
      selectionRef?.current?.clearSelection();
      queryClient.invalidateQueries("leads");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = (data: any) => {
    confirm({
      msg: "Are you sure you want to delete selected leads?",
      action: () => {
        mutate(data.map((c: any) => c.id));
      },
    });
  };

  return (
    <Box p={3}>
      <Nav />
      <Box mb={2}>
        <SearchContainer
          value={search}
          debounced
          minWidth="400px"
          onChange={setSearch}
          placeHolder="Search"
        />
      </Box>
      <Table
        data={data?.data?.data || []}
        columns={columns}
        loading={isLoading}
        selection={{
          selectionRef: selectionRef,
          toolbar: (selected, clearSelection) => (
            <IconButton
              color="secondary"
              onClick={() => handleDelete(selected)}
            >
              <Delete />
            </IconButton>
          ),
        }}
        pagination={{
          totalCount: data?.data?.totalCount,
          pageCount: limit,
          onPageCountChange: (v) => setLimit(v),
          onChange: (v) => {
            setOffset(v);
          },
        }}
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
      <ConverLead
        open={convertOpen}
        setOpen={setConvertOpen}
        data={selectedLead}
      />
      <ViewLead open={infoOpen} setOpen={setInfoOpen} data={selectedLead} />
    </>
  );
};

const columns = [
  {
    key: "category",
    title: "Category",
    render: (rowData) => getTitle(rowData?.category),
  },
  {
    key: "subCategory",
    title: "Sub Category",
    render: (rowData) => getTitle(rowData?.subCategory),
  },
  { key: "name", title: "Name" },
  { key: "mobileNumber", title: "Mobile Number" },
  { key: "email", title: "Email" },
  {
    key: "actions",
    title: "Actions",
    render: (rowData) => <Actions data={rowData} />,
  },
];

export default Leads;
