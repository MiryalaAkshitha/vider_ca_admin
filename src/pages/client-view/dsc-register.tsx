import { Delete, Visibility } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { deleteDscRegister, getDscRegisters } from "api/services/clients/dsc-register";
import { useConfirm } from "context/ConfirmDialog";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ResType } from "types";
import AddDscRegister from "views/client-view/dscregister/AddDscRegister";
import EditDscRegister from "views/client-view/dscregister/EditDscRegister";
import IssueOrReceive from "views/client-view/dscregister/IssueOrReceive";

function DscRegister() {
  useTitle("Dsc Register");
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number>(5);
  const [offset, setOffset] = useState<number>(0);

  const { isLoading, data }: ResType = useQuery(
    [
      "dsc-register",
      {
        type: "CLIENT",
        clientId: params.clientId,
        limit: limit,
        offset: offset * limit,
        search,
      },
    ],
    getDscRegisters
  );

  return (
    <Box p={3}>
      <Box mb={2} display="flex" justifyContent="flex-end">
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
        pagination={{
          totalCount: data?.data?.totalCount,
          pageCount: limit,
          setPageCount: setLimit,
          page: offset,
          setPage: setOffset,
        }}
      />
      <FloatingButton onClick={() => setOpen(true)} />
      <AddDscRegister open={open} setOpen={() => setOpen(false)} />
    </Box>
  );
}

const Actions = ({ data }) => {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [issueOrReceiveOpen, setIssueOrReceiveOpen] = useState(false);
  const [type, setType] = useState<"issue" | "receive">("issue");

  const { mutate } = useMutation(deleteDscRegister, {
    onSuccess: () => {
      snack.success("DSC Regiter Deleted");
      queryClient.invalidateQueries("dsc-register");
      setOpen(false);
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleDelete = () => {
    confirm({
      msg: "Are you sure you want to delete this DSC Register?",
      action: () => mutate(data?.id),
    });
  };

  return (
    <Box>
      <Box display="flex" gap={1}>
        <IconButton
          size="small"
          onClick={() => {
            navigate(`${data?.id}`);
          }}
        >
          <Visibility />
        </IconButton>
        <IconButton size="small" onClick={handleDelete}>
          <Delete />
        </IconButton>
        {data?.status === "received" || data?.status === "not_issued" ? (
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              onClick={(e) => {
                setSelected(data);
                setType("issue");
                setIssueOrReceiveOpen(true);
              }}
              color="primary"
              variant="contained"
              sx={{ minWidth: 80, background: "#1565C0", color: "white" }}
            >
              Issue
            </Button>
            <Typography variant="body2">
              {data?.status === "received"
                ? `(Received on ${moment
                    .utc(data?.receivedDate)
                    .local()
                    .format("MM/DD/YYYY, h:mm a")})`
                : "(Not Issued)"}
            </Typography>
          </Box>
        ) : null}
        {data?.status === "issued" && (
          <Box display="flex" alignItems="center" gap={1}>
            <Button
              onClick={() => {
                setSelected(data);
                setType("receive");
                setIssueOrReceiveOpen(true);
              }}
              variant="contained"
              color="primary"
              sx={{ minWidth: 80, background: "#7CB342", color: "white" }}
            >
              Receive
            </Button>
            <Typography variant="body2">
              (Issued on {moment.utc(data?.issuedDate).local().format("MM/DD/YYYY, h:mm a")})
            </Typography>
          </Box>
        )}
      </Box>
      <EditDscRegister open={open} setOpen={setOpen} data={selected} />
      <IssueOrReceive
        open={issueOrReceiveOpen}
        setOpen={setIssueOrReceiveOpen}
        type={type}
        dscRegister={data?.id}
      />
    </Box>
  );
};

const columns = [
  { key: "holderName", title: "DSC Holder Name" },
  {
    key: "expiryDate",
    title: "Expiry Date",
    render: (row: any) => {
      return moment(row?.expiryDate).format("DD-MM-YYYY");
    },
  },
  {
    key: "",
    title: "No of days left to expiry",
    render: (row: any) => <NoOfDaysLeftToExpiry row={row} />,
  },
  { key: "password", title: "Password" },
  {
    key: "actions",
    title: "Actions",
    render: (row: any) => <Actions data={row} />,
  },
];

export function NoOfDaysLeftToExpiry({ row }: any) {
  const daysLeft = moment(row?.expiryDate).add(1, "day").diff(moment(), "days");
  return daysLeft > 0 ? (
    <span> {daysLeft?.toString()} </span>
  ) : (
    <span style={{ color: "red" }}>Expired</span>
  );
}

export default DscRegister;
