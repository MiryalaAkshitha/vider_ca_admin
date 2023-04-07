import { DesktopDatePicker } from "@mui/lab";
import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import { useState } from "react";

const Types = ["Leave", "Holiday", "Hrms"];

function CreateHrms() {
  const [hrmsData, setHrmsData] = useState({
    atomTaskId: "",
    atomId: "",
    startDate: "",
    endDate: "",
    hrmsType: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHrmsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data1 = JSON.stringify({
      "name": `hrms${Math.floor(Math.random() * 10)}`,
      "atomID": hrmsData?.atomId,
      "atomTaskID": hrmsData?.atomTaskId,
      "id": "",
      // "name": "check1",
      "deleted": false,
      "description": hrmsData?.description,
      "createdAt": "",
      "modifiedAt": "",
      "atomTaskDescription": null,
      "taskStartDate": null,
      "taskEndDate": null,
      "taskDuration": null,
      "atomUserID": null,
      "atomClientID": null,
      "atomOrganisationID": null,
      "leaveDescription": null,
      "clientName": null,
      "emailIDs": null,
      "hrmsType": hrmsData?.hrmsType,
      "createdById": "1",
      "assignedUserId": "1",
      "assignedUserName": "Admin",
      "teamsIds": [],
      "teamsNames": {},
      "startDate": hrmsData?.startDate,
      "endDate": hrmsData?.endDate,
    });

    axios({
      method: 'post',
      url: 'https://vidersupport.com/espo/crm/api/v1/HRMS',
      headers: {
        'x-api-key': 'cb7397dc8250e64516602f5894f7bf5f',
        'Content-Type': 'application/json'
      },
      data: data1

    }).then((() => alert("created succussfully"))).catch((err) => alert("error"))

  };

  return (
    <Box p={3}>
      <Grid container>
        <Grid item lg={6}>
          <form onSubmit={handleSubmit}>
            <TextField
              size="small"
              label="TaskId"
              sx={{ mb: 1 }}
              variant="outlined"
              name="atomTaskId"
              onChange={handleChange}
            />
            <TextField
              size="small"
              label="Atom ID"
              sx={{ mt: 1 }}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              name="atomId"
            />
            <TextField
              select
              size="small"
              label="HRMS type"
              sx={{ mt: 2 }}
              variant="outlined"
              name="hrmsType"
              onChange={handleChange}

              fullWidth
            // onChange={handleChange}

            >
              {Types.map((i) => (
                <MenuItem key={i} value={i}>
                  {i}
                </MenuItem>
              ))}
            </TextField>
            <Grid mt={2}>
              <DesktopDatePicker
                label="Start date"
                inputFormat="dd-MM-yyyy"
                value={hrmsData?.startDate}
                onChange={(v: any) => setHrmsData({ ...hrmsData, startDate: v })}
                renderInput={(params) => (
                  <TextField size="small" {...params} />
                )}
              />
            </Grid>
            <Grid mt={2}>
              <DesktopDatePicker
                label="End date"
                inputFormat="dd-MM-yyyy"
                value={hrmsData?.endDate}
                onChange={(v: any) => setHrmsData({ ...hrmsData, endDate: v })}
                renderInput={(params) => (
                  <TextField size="small" {...params} />
                )}
              />
            </Grid>
            <Grid mt={2}>
              <TextField
                label=" Description"
                onChange={handleChange}
                fullWidth
                name="description">
              </TextField>
            </Grid>



            {/* <TextField
              size="small"
              label="Holiday Description"
              sx={{ mt: 1 }}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              name="HolidayDesc"
            /> */}
            {/* <TextField
              size="small"
              label="Leave Description"
              sx={{ mt: 1 }}
              onChange={handleChange}
              variant="outlined"
              fullWidth
              name="LeaveDesc"
            />


            <TextField
              required
              size="small"
              label="Task Name"
              sx={{ mt: 1 }}
              variant="outlined"
              name="taskName"
              fullWidth
              onChange={handleChange}
            /> */}

            <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
              Create HRMS
            </Button>
          </form>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CreateHrms;






















