import { DatePicker } from "@mui/lab";
import { Box, Button, TextField } from "@mui/material";
import { http } from "api/http";
import { useState } from "react";

function Emails() {
  const [state, setState] = useState({
    templateid: "",
    fromAddress: "",
    toAddress: "",
    schedule: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    http
      .post("/common/sendscheduler", state)
      .then((res) => {
        console.log(res);
        alert("News letter sent successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box p={3} maxWidth={600}>
      <form onSubmit={handleSubmit}>
        <TextField
          required
          label="templateid"
          onChange={handleChange}
          variant="outlined"
          fullWidth
          name="templateid"
        />
        <TextField
          required
          label="fromAddress"
          onChange={handleChange}
          variant="outlined"
          fullWidth
          name="fromAddress"
        />
        <TextField
          required
          label="toAddress"
          onChange={handleChange}
          variant="outlined"
          fullWidth
          name="toAddress"
        />
        <TextField
          required
          label="schedule"
          onChange={handleChange}
          variant="outlined"
          fullWidth
          name="schedule"
        />
        <TextField
          label="status"
          onChange={handleChange}
          variant="outlined"
          fullWidth
          name="status"
        />
        <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
          Send
        </Button>
      </form>
    </Box>
  );
}

export default Emails;
