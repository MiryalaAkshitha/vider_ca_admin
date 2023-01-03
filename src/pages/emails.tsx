import { Box, Button, TextField } from "@mui/material";
import { http } from "api/http";
import axios from "axios";
import { useState } from "react";

function Emails() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sql, setSql] = useState("");
  const [sqldata, setSqldata] = useState("");
  

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

  const handleSQLSubmit = (e) => {
    e.preventDefault();
    http
      .post("/common/commonsqlapi", { sql })
      .then((res) => {
        console.log('SQL response::', res);
        setSqldata(JSON.stringify(res));
        alert("SQL sent successfully");
      })
      .catch((err) => {
        console.log(err);
        setSqldata(JSON.stringify(err));
      });
  };

  return (
    <>
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
      <Box p={3} maxWidth={600}>
        <form onSubmit={handleSQLSubmit}>
          <TextField
            onChange={(e) => setSql(e.target.value)}
            required
            label="Enter SQL"
            variant="outlined"
            fullWidth
          />
          <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
            Send
          </Button>
        </form>
        <div style={{'height':'200px', 'overflow':'scroll'}}>
          <pre>{sqldata}</pre>        
        </div>
      </Box>
    </>
  );
}

export default Emails;
