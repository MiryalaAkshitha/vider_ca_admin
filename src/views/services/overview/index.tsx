import {
  Container,
  MenuItem,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import { Box } from "@mui/system";
import Add from "@mui/icons-material/Add";
import AddContentFieldModal from "./AddContentFieldModal";
import { useState } from "react";

function Overview({ data }: any) {
  const [open, setOpen] = useState(false);

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
          <Box textAlign='right' mt={3}>
            <Button
              onClick={() => setOpen(true)}
              color='secondary'
              startIcon={<Add />}>
              Add Content Block
            </Button>
          </Box>
        </Container>
      </Box>
      <AddContentFieldModal open={open} setOpen={setOpen} />
    </>
  );
}

export default Overview;
