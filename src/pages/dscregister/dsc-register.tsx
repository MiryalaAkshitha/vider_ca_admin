import { Add, Delete, Visibility } from "@mui/icons-material";
import { Alert, Box, Button, Grid, IconButton, Typography } from "@mui/material";
import { deleteDscRegister, getDscRegisters } from "api/services/clients/dsc-register";
import FloatingButton from "components/FloatingButton";
import SearchContainer from "components/SearchContainer";
import Table from "components/Table";
import { snack } from "components/toast";
import { useConfirm } from "context/ConfirmDialog";
import useTitle from "hooks/useTitle";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import { ResType } from "types";
import { handleError } from "utils/handleError";
import EditDscRegister from "views/client-view/dscregister/EditDscRegister";
import IssueOrReceive from "views/client-view/dscregister/IssueOrReceive";
import AddDscRegister from "views/dsc-register/AddDscRegister";
import { NoOfDaysLeftToExpiry } from "../client-view/dsc-register";

type Props = {
  data: any;
  };
const Password = ({ data }: Props) => {
  const [show, setShow] = useState(false);
  return (
    <Grid item xs={2}>
      {/*<Typography gutterBottom variant="body2" color="rgba(0,0,0,0.5)">
       Password
  </Typography>*/}
     {show ? (
       <Typography gutterBottom variant="body1">
         {data?.password}
       </Typography>
     ) : (
       <Typography
         onClick={() => setShow(true)}
         style={{ cursor: "pointer", color: "#149ECD" }}
         gutterBottom
          variant="body1"
        >
         Click to see
       </Typography>
     )}
    </Grid>
  );
};
function DscRegister() {
  useTitle("DSC Register");
  const [search, setSearch] = useState("");
  const [limit, setLimit] = useState<number>(10);
  const [offset, setOffset] = useState<number>(0);
  const [open, setOpen] = useState(false);

  const { isLoading, data, error }: ResType = useQuery(
    [
      "dsc-register",
      {
        type: "ORGANIZATION",
        limit: limit,
        offset: offset * limit,
        search,
      },
    ],
    getDscRegisters,
    { retry: false }
  );

  if (error) {
    return (
      <Alert sx={{ maxWidth: 500, margin: "auto", mt: 5 }} severity="error">
        {handleError(error)}
      </Alert>
    );
  }

  return (
    <Box p={3}>
      <Box mb={2} display="flex" justifyContent="space-between">
        <SearchContainer
          value={search}
          debounced
          minWidth="400px"
          onChange={setSearch}
          placeHolder="Search by Client Name | DSC Holder Name"
        />
      </Box>
      <Table
        data={data?.data?.data || []}
        columns={columns}
        loading={isLoading}
        pagination={{
          totalCount: data?.data?.totalCount || 0,
          pageCount: limit,
          setPageCount: setLimit,
          page: offset,
          setPage: setOffset,
        }}
      />

      <AddDscRegister open={open} setOpen={setOpen} />
      <FloatingButton onClick={() => setOpen(true)} />
    </Box>
  );
}

const Actions = ({ data }) => {
  const confirm = useConfirm();
  const queryClient = useQueryClient();
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
                ? `(Received on ${moment(data?.receivedDate).format("DD-MM-YYYY, h:mm a")})`
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
              (Issued on {moment(data?.issuedDate).format("DD-MM-YYYY, h:mm a")})
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
  { key: "client.displayName", title: "Client Name" },
  { key: "holderName", title: "DSC Holder Name" },
  {
    key: "expiryDate",
    title: "DSC Expiry Date",
    render: (row: any) => {
      return moment(row?.expiryDate).format("DD-MM-YYYY");
    },
  },
  {
    key: "",
    title: "Days left to DSC Expiry",
    render: (row: any) => <NoOfDaysLeftToExpiry row={row} />,
  },
  {
    key: "password",
    title: "Password",
   render: (rowData: any) => <Password data={rowData} />,
  },
  {
    key: "actions",
    title: "Actions",
    render: (rowData: any) => <Actions data={rowData} />,
  },
];

export default DscRegister;