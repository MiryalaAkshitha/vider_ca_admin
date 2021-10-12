import {
  Container,
  MenuItem,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import Add from "@mui/icons-material/Add";
import AddContentBlock from "./AddContentBlock";
import { useState } from "react";
import { useSelector } from "react-redux";
import { addServiceState } from "redux/reducers/addServiceSlice";
import ContentBlock from "./ContentBlock";

function Overview({ data }: any) {
  const [open, setOpen] = useState(false);
  const state = useSelector(addServiceState);

  return (
    <>
      <Box mt={4}>
        <Typography variant='subtitle2' color='primary'>
          Overview
        </Typography>
        <Container sx={{ mt: 4 }}>
          <Box>
            <Typography mb={1} variant='body2' color='primary'>
              Select Category
            </Typography>
            <TextField fullWidth size='small' select>
              {data?.data.map((option: any, index: any) => (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={3}>
            <Typography mb={1} variant='body2' color='primary'>
              Select Sub Category
            </Typography>
            <TextField fullWidth size='small' select>
              {data?.data.map((option: any, index: any) => (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={3}>
            <Typography mb={1} variant='body2' color='primary'>
              Service Name
            </Typography>
            <TextField
              fullWidth
              placeholder='Enter Service Name'
              size='small'
            />
          </Box>
          <Box mt={3}>
            <Typography mb={1} variant='body2' color='primary'>
              Service Price
            </Typography>
            <TextField
              fullWidth
              placeholder='Enter Service Price'
              size='small'
            />
          </Box>
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
      {JSON.stringify(state.description)}
      <AddContentBlock open={open} setOpen={setOpen} />
    </>
  );
}

export default Overview;
