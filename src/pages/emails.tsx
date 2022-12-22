import { Box, Button, TextField } from "@mui/material";
import { http } from "api/http";
import axios from "axios";
import { useState } from "react";

function Emails() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    http
      .post("/common/send-mail", { from, to })
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
          onChange={(e) => setFrom(e.target.value)}
          required
          label="From Email"
          variant="outlined"
          fullWidth
        />
        <TextField
          onChange={(e) => setTo(e.target.value)}
          required
          label="To Email"
          sx={{ mt: 2 }}
          variant="outlined"
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
          Send
        </Button>
      </form>
    </Box>
  );
}

export default Emails;
