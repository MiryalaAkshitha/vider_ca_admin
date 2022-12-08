import { Box, Button, Grid, MenuItem, TextField } from "@mui/material";
import { http } from "api/http";
import axios from "axios";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { ResType } from "types";

function Emails() {
  const [state, setState] = useState({
    fromAddress: "",
    toAddress: "",
    subject: "",
    body: "",
    templateid: "",
    atomID: "",
  });

  const { data, isLoading }: ResType = useQuery(["templates"], () => {
    return http.get("/common/email-templates");
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
      .post("/common/sendAtomEmails", state)
      .then((res) => {
        console.log(res);
        alert("Email sent successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box p={3}>
      <Grid container>
        <Grid item lg={6}>
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
              select
              label="Template Id"
              name="templateid"
              sx={{ mt: 2 }}
              variant="outlined"
              fullWidth
              onChange={handleChange}
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
            <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
              Send
            </Button>
          </form>
        </Grid>
        <Grid item lg={6}>
          <div
            dangerouslySetInnerHTML={{
              __html: state?.templateid
                ? data.data.list.find((item) => item.name == state.templateid).body
                : "",
            }}
          ></div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Emails;
