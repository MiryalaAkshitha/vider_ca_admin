import { Box, Button, TextField } from "@mui/material";
import { http } from "api/http";
import axios from "axios";
import { useState } from "react";

function Emails() {
  const [state, setState] = useState({
    fromAddress: "",
    toAddress: "",
    subject: "",
    body: "",
    templateid: "",
    atomID: "",
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
      .post("/common/send-mail2", state)
      .then((res) => {
        console.log(res);
        alert("Email sent successfully");
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
          label="Body"
          sx={{ mt: 2 }}
          variant="outlined"
          name="body"
          fullWidth
          multiline
          rows={5}
          onChange={handleChange}
        />
        <TextField
          required
          label="Template Id"
          name="templateid"
          sx={{ mt: 2 }}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          required
          label="Atom Id"
          name="atomID"
          sx={{ mt: 2 }}
          variant="outlined"
          fullWidth
          onChange={handleChange}
        />
        <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
          Send
        </Button>
      </form>
    </Box>
  );
}

export default Emails;
