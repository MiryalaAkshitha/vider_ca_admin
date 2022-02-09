import { Delete, Edit, Visibility } from "@mui/icons-material";
import { Box, Button, IconButton, Typography } from "@mui/material";
import { deleteDscRegister, getDscRegisters } from "api/services/client";
import { useConfirm } from "components/ConfirmDialogProvider";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import useSnack from "hooks/useSnack";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import Nav from "../Nav";
import AddDscRegister from "./AddDscRegister";
import EditDscRegister from "./EditDscRegister";
import IssueOrReceive from "./IssueOrReceive";

function DscRegister() {
  useTitle("Dsc Register");
  const [open, setOpen] = useState(false);

  const { isLoading, data }: ResType = useQuery(
    "dsc-register",
    getDscRegisters
  );

  return (
    <Box p={3}>
      <Nav />
      <Box mb={2}>
        <SearchContainer
          debounced
          minWidth="400px"
          onChange={(v) => {
            console.log(v);
          }}
          placeHolder="Search"
        />
      </Box>
      <Table data={data?.data || []} columns={columns} loading={isLoading} />
      <FloatingButton onClick={() => setOpen(true)} />
      <AddDscRegister open={open} setOpen={() => setOpen(false)} />
    </Box>
  );
}

const Actions = ({ data }) => {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
  const snack = useSnack();
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const [issueOrReceiveOpen, setIssueOrReceiveOpen] = useState(false);
  const [type, setType] = useState<"issue" | "receive">("issue");
  const navigate = useNavigate();

  const { mutate } = useMutation(deleteDscRegister, {
    onSuccess: (res) => {
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
      action: () => {
        mutate(data?.id);
      },
    });
  };

  return (
    <>
      <Box display="flex" gap={1}>
        <IconButton
          size="small"
          onClick={() => {
            navigate(`/dsc-register/${data?.id}`);
          }}
        >
          <Visibility />
        </IconButton>
        <IconButton
          size="small"
          onClick={() => {
            setSelected(data);
            setOpen(true);
          }}
        >
          <Edit />
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
                ? `(Received on ${moment(data?.receivedDate).format(
                    "YYYY-MM-DD"
                  )})`
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
              (Issued on {moment(data?.issuedDate).format("YYYY-MM-DD")})
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
    </>
  );
};

const columns = [
  { key: "client.displayName", title: "Client Name" },
  { key: "holderName", title: "DSC Holder Name" },
  { key: "expiryDate", title: "Expiry Date" },
  { key: "", title: "No of days left to expiry" },
  { key: "password", title: "Password" },
  {
    key: "actions",
    title: "Actions",
    render: (rowData) => <Actions data={rowData} />,
  },
];

export default DscRegister;
