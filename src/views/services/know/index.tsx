import Add from "@mui/icons-material/Add";
import { Button, Container, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addServiceState } from "redux/reducers/addServiceSlice";
import AddContentBlock from "./AddContentBlock";
import ContentBlock from "./ContentBlock";

function KnowYourServices() {
  const [open, setOpen] = useState(false);
  const state = useSelector(addServiceState);

  return (
    <>
      <Box mt={4}>
        <Typography variant='subtitle2' color='primary'>
          Know your services
        </Typography>
        <Container sx={{ mt: 4 }}>
          <Box>
            {state.description.map((item, index) => (
              <ContentBlock item={item} key={index} index={index} />
            ))}
          </Box>
          <Box textAlign='right' mt={3}>
            <Button
              onClick={() => setOpen(true)}
              color='secondary'
              variant='outlined'
              startIcon={<Add />}>
              Add Content Block
            </Button>
          </Box>
        </Container>
      </Box>
      <AddContentBlock open={open} setOpen={setOpen} />
    </>
  );
}

export default KnowYourServices;
