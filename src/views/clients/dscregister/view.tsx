import { Box, Button, Grid, Typography } from "@mui/material";
import { getDscRegister } from "api/services/client";
import BreadCrumbs from "components/BreadCrumbs";
import Loader from "components/Loader";
import Table from "components/Table";
import moment from "moment";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import IssueOrReceive from "./IssueOrReceive";

function View() {
  const params = useParams();
  const [issueOrReceiveOpen, setIssueOrReceiveOpen] = useState(false);
  const [type, setType] = useState<"issue" | "receive">("issue");

  const { data, isLoading }: ResType = useQuery(
    ["dsc-register-details", { id: params.dscId }],
    getDscRegister
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Box p={3}>
        <BreadCrumbs page="dscRegisterDetails" />
        <Box width={600} mt={3}>
          <Typography mb={2} variant="subtitle2" color="primary">
            Details
          </Typography>
          <DetailRow
            label="Client Name"
            value={data?.data?.client?.displayName}
          />
          <DetailRow label="DSC Holder name" value={data?.data?.holderName} />
          <DetailRow label="Expiry Date" value={data?.data?.expiryDate} />
          <DetailRow label="Password" value={data?.data?.password} />
          <DetailRow label="Token Number" value={data?.data?.tokenNumber} />
          <DetailRow label="PAN Number" value={data?.data?.panNumber} />
          <DetailRow label="Mobile Number" value={data?.data?.mobileNumber} />
          <DetailRow
            label="DSC Holder Designation"
            value={data?.data?.holderDesignation}
          />
        </Box>
        <Box mt={5} maxWidth={1000}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle2" color="primary">
              DSC Issued and Received dates
            </Typography>
            {data?.data?.status === "received" ||
            data?.data?.status === "not_issued" ? (
              <Box display="flex" gap={1} alignItems="center">
                <Button
                  onClick={(e) => {
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
                  {data?.data?.status === "received"
                    ? `(Received on ${moment(data?.data?.receivedDate).format(
                        "YYYY-MM-DD"
                      )})`
                    : "(Not Issued)"}
                </Typography>
              </Box>
            ) : null}
            {data?.data?.status === "issued" && (
              <Box textAlign="center">
                <Button
                  onClick={() => {
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
                  (Issued on{" "}
                  {moment(data?.data?.issuedDate).format("YYYY-MM-DD")})
                </Typography>
              </Box>
            )}
          </Box>
          <Grid container mt={1} spacing={2}>
            <Grid item xs={6}>
              <Table
                data={
                  data?.data?.dscActivity?.filter(
                    (item) => item.type === "issue"
                  ) || []
                }
                loading={false}
                columns={[
                  {
                    title: "Issued Person Name",
                    key: "personName",
                  },
                  {
                    title: "Issued Date",
                    key: "date",
                    render: (row) => moment(row.date).format("DD-MM-YYYY"),
                  },
                ]}
              />
            </Grid>
            <Grid item xs={6}>
              <Table
                data={
                  data?.data?.dscActivity?.filter(
                    (item) => item.type === "receive"
                  ) || []
                }
                loading={false}
                columns={[
                  {
                    title: "Received Person Name",
                    key: "personName",
                  },
                  {
                    title: "Received Date",
                    key: "date",
                    render: (row) => moment(row.date).format("DD-MM-YYYY"),
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      <IssueOrReceive
        open={issueOrReceiveOpen}
        setOpen={setIssueOrReceiveOpen}
        type={type}
        dscRegister={data?.data?.id}
      />
    </>
  );
}

const DetailRow = ({ label, value }) => (
  <Grid container spacing={2} sx={{ mb: 2 }}>
    <Grid item xs={6}>
      <Typography variant="body1">{label}</Typography>
    </Grid>
    <Grid item xs={1}>
      <Typography variant="h6">:</Typography>
    </Grid>
    <Grid item xs={5}>
      <Typography variant="subtitle2">{value}</Typography>
    </Grid>
  </Grid>
);

export default View;
