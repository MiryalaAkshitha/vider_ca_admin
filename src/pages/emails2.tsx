import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { http } from "api/http";
import axios from "axios";
import Loader from "components/Loader";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";

let templateData = {
  clientDeleted: [
    "ViderMemberName",
    "ViderClientName",
    "ViderOrganizationName",
    "ViderCategory",
    "ViderMobileNumber",
    "ViderEmailId",
  ],
  underspentWorkingHours: [
    "ViderMemberName",
    "ViderNoOfHours",
    "ViderRemainingHour",
    "ViderStandHour",
    "ViderRemainingHour",
    "ViderStandHour",
    "ViderNoHoursSpent",
    "ViderAverageHours",
    "ViderRemainingAverageHours",
  ],
  overspentWorkingHours: [
    "ViderMemberName",
    "ViderNoOfHours",
    "ViderStandarNoOfHours",
    "ViderNoOfHoursSpent",
    "ViderAverageNoOfHours",
    "ViderRemaingAvgHours",
  ],
  inviteReminder: ["ViderMemberName", "ViderOrganisationName", "ViderExpiryDate"],
  logHoursNonFiling: ["ViderMemberName"],
  dscRegisterIsExpiring: [
    "ViderClientName",
    "ViderDSCHolder",
    "ViderDSCHolderName",
    "ViderExpiry",
    "ViderDaysLeft",
    "ViderExpiryDate",
  ],
  dscRegisterReceived: [
    "ViderClientName",
    "ViderDscHolderName",
    "ViderDSCHolder",
    "ViderOrganizationName",
    "ViderRegisterDate",
    "ViderDateOfReceipt",
    "ViderExpiryDate",
  ],
  dscRegisterIssued: [
    "ViderClientName",
    "ViderApplicantName",
    "ViderOrganizationName",
    "ViderDate",
    "ViderDscHolderName",
    "ViderDateOfIssue",
    "ViderExpiryDate",
  ],
  taskExpenditureAdded: [
    "ViderMemberName",
    "ViderTASK",
    "ViderExpenditureName",
    "ViderAmount",
    "ViderExpenditureAttachment",
  ],
  eventCreatedForUser: [
    "ViderEvent",
    "ViderTASK",
    "ViderParticipantName",
    "ViderEventName",
    "ViderTaskName",
    "ViderOrganizationName",
    "ViderDate",
    "ViderStartDate",
    "ViderEndDate",
    "ViderLocation",
  ],
  commentAdded: [
    "ViderMemberName",
    "ViderUserName",
    "ViderTaskName",
    "ViderClientName",
    "VideComment",
    "ViderUserName",
    "ViderTask",
  ],
  leadCreated: ["ViderLeadName", "viderleadname", "ViderOrganizationName", "ViderServiceName"],
  subTaskCreatedForUser: [
    "ViderTaskName",
    "ViderUserName",
    "ViderMemberName",
    "ViderTaskName",
    "ViderTaskID",
    "ViderSubTaskName",
    "ViderTaskAssignedTo",
    "ViderDueDate",
  ],
  taskCreatedForUser: [
    "ViderUserName",
    "vidertaskname",
    "ViderOrganizationName",
    "ViderTaskId",
    "ViderStartDate",
    "ViderDueDate",
    "ViderAssignedTo",
  ],
  taskStatusUpdatedForClient: [
    "ViderClientName",
    "ViderTaskId",
    "vidertaskname",
    "ViderStartDate",
    "ViderEndDate",
    "ViderAssignedTo",
  ],
  taskStatusUpdatedForUser: [
    "ViderMemberName",
    "ViderTaskName",
    "ViderFromStatus",
    "ViderToStatus",
    "ViderTaskId",
    "ViderTaskName",
    "ViderClientName",
    "ViderAssignedTo",
  ],
  userInvited: ["ViderUserName", "ViderOrganizationName"],
  clientCreation: ["ViderClientName "],
  organizationSignUp: ["ViderOrganization"],
  subTaskCreatedForClient: [
    "ViderClientName",
    "VideTaskId",
    "vidertaskname",
    "ViderSubTaskName",
    "ViderTaskAssignedTo",
    "ViderDueDate",
  ],
  taskCreatedForClient: [
    "ViderClientName",
    "vidertaskname",
    "ViderOrganizationName",
    "ViderTaskId",
    "ViderStartDate",
    "ViderDueDate",
    "ViderAssignedTo",
  ],
  taskDeleted: [
    "ViderMemberName",
    "ViderTaskName",
    "ViderCompName",
    "VderOrganizationName",
    "ViderDateOfTaskCreation",
    "ViderTaskId",
    "ViderCompanyRegistration",
    "ViderCompRegEndDate",
    "ViderCompRegStartDate",
    "ViderAssignedTo",
    "ViderDeletionDate",
  ],
};

function Emails() {
  const [state, setState] = useState({
    fromAddress: "",
    toAddress: "",
    subject: "",
    body: "",
    templateid: "",
    atomID: "",
    payload: {},
  });

  const { data, isLoading }: ResType = useQuery(["templates"], () => {
    return http.get("/common/email-templates");
  });

  useEffect(() => {
    let response = "";
    if (!state.templateid) return;
    const temp = data.data.list.find((item) => item.name === state.templateid);
    response = temp?.body;
    if (temp?.name === state.templateid) {
      templateData[temp.name]?.forEach((item) => {
        response = response?.replace(item, state.payload[item]);
      });
    }
    setState({
      ...state,
      body: response,
    });
  }, [state, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTemplateChange = (e) => {
    const temp = data.data.list.find((item) => item.name === e.target.value);
    let values = templateData[temp.name];
    let payload = {};

    values.forEach((item) => {
      payload[item] = "";
    });

    setState({
      ...state,
      templateid: e.target.value,
      payload,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    http
      .put(`/comman/send-mail2/${state.templateid}`, state.body)
      .then((res) => {
        alert("Email sent successfully");
      })
      .catch((err) => {
        console.log(err);
        alert("request failed");
      });

    // http
    //   .put(`/comman/updated-mail/${state.templateid}`, state.body)
    //   .then((res) => {
    //     alert("Email sent successfully");
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     alert("request failed");
    //   });

    http
      .post("/common/send-mail2", state)
      .then((res) => {
        alert("Email sent successfully");
      })
      .catch((err) => {
        console.log(err);
      });

    // async function emailPost() {
    //   try {
    //     const response = await axios({
    //       method: "PUT",
    //       url: `http://vidersupport.com/espo/crm/api/v1/EmailTemplate/${state.templateid}`,
    //       headers: {
    //         "Content-Type": "application/json",
    //         "X-Api-Key": "cb7397dc8250e64516602f5894f7bf5f",
    //       },
    //       data: JSON.stringify(state.body),
    //     });
    //     console.log(response);
    //     alert("succuss");
    //   } catch (error) {
    //     console.log(error);
    //     alert("error");
    //   }
    // }
    // emailPost();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box p={3}>
      <Grid container>
        <Grid item lg={4}>
          <form onSubmit={handleSubmit}>
            <TextField
              required
              label="From Email"
              onChange={handleChange}
              variant="outlined"
              fullWidth
              name="fromAddress"
            />
            <TextField
              required
              label="To Email"
              sx={{ mt: 2 }}
              variant="outlined"
              name="toAddress"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              required
              label="Subject"
              sx={{ mt: 2 }}
              variant="outlined"
              name="subject"
              fullWidth
              onChange={handleChange}
            />
            <TextField
              required
              select
              label="Template Id"
              name="templateid"
              sx={{ mt: 2 }}
              variant="outlined"
              fullWidth
              onChange={handleTemplateChange}
            >
              {data.data?.list.map((item) => {
                return (
                  <MenuItem key={item.id} value={item.name}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </TextField>
            <TextField
              required
              label="Atom Id"
              name="atomID"
              sx={{ mt: 2 }}
              variant="outlined"
              fullWidth
              onChange={handleChange}
            />
            <p style={{ fontSize: "11px", color: "red" }}>Template Required Data</p>
            <div
              style={{
                height: "200px",
                overflow: "scroll",
                border: "1px solid #000",
                marginTop: "10px",
              }}
            >
              {Object.keys(state.payload).map((item) => (
                <TextField
                  required
                  label={item}
                  name={item}
                  sx={{ mt: 2 }}
                  variant="outlined"
                  fullWidth
                  onChange={(e) => {
                    setState({
                      ...state,
                      payload: {
                        ...state.payload,
                        [item]: e.target.value,
                      },
                    });
                  }}
                />
              ))}
            </div>
            <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
              Send
            </Button>
          </form>
        </Grid>
        <Grid item lg={8}>
          <Box sx={{ height: "580px", ml: 1, overflow: "scroll", border: "1px solid grey" }}>
            <div
              dangerouslySetInnerHTML={{
                __html: state?.templateid
                  ? state.body
                  : `<div>
                  <center>
                  <h6>Preview template here</h6>
                  </center>
                  </div>`,
              }}
            ></div>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Emails;
