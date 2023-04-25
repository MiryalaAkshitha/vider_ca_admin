import { Box, Button, Grid, Typography } from "@mui/material";
import Table from "components/Table";
import moment from "moment";
import { useState } from "react";
import IssueOrReceive from "views/client-view/dscregister/IssueOrReceive";

type Type = "issue" | "receive";

function DscActivity({ data }) {
  const [issueOrReceiveOpen, setIssueOrReceiveOpen] = useState(false);
  const [type, setType] = useState<Type>("issue");

  const issuedData = data?.data?.dscActivity?.filter((item: any) => item.type === "issue");
  const receivedData = data?.data?.dscActivity?.filter((item: any) => item.type === "receive");
  return (
    <>
      <Box mt={5}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" color="primary">
            DSC Issued & Received Dates
          </Typography>
          {data?.data?.status === "received" || data?.data?.status === "not_issued" ? (
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
                  ? `(Received on ${moment(data?.data?.receivedDate).format("DD-MM-YYYY")})`
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
                (Issued on {moment(data?.data?.issuedDate).format("DD-MM-YYYY")})
              </Typography>
            </Box>
          )}
        </Box>
        <Grid container mt={1} spacing={2}>
          <Grid item xs={6}>
            <Table
              data={issuedData || []}
              loading={false}
              columns={[
                {
                  title: "Issued Person Name",
                  key: "personName",
                },
                {
                  title: "Issued Date",
                  key: "date",
                  render: (row) => {
                    return moment(row?.date).format("DD-MM-YYYY, h:mm a");
                  },
                },
              ]}
            />
          </Grid>
          <Grid item xs={6}>
            <Table
              data={receivedData || []}
              loading={false}
              columns={[
                {
                  title: "Received Person Name",
                  key: "personName",
                },
                {
                  title: "Received Date",
                  key: "date",
                  render: (row) => {
                    return moment(row?.date).format("DD-MM-YYYY, h:mm a");
                  },
                },
              ]}
            />
          </Grid>
        </Grid>
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

export default DscActivity;
