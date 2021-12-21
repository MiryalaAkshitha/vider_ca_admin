import { Container, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ReactQuill from "lib/react-quill";

function Overview({ data }: any) {
  return (
    <>
      <Box mt={4}>
        <Typography variant="subtitle2" color="primary">
          Overview
        </Typography>
        <Container sx={{ mt: 4 }}>
          <Box>
            <Typography mb={1} variant="body2" color="primary">
              Select Category
            </Typography>
            <TextField fullWidth size="small" select>
              {data?.data.map((option: any, index: any) => (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={3}>
            <Typography mb={1} variant="body2" color="primary">
              Select Sub Category
            </Typography>
            <TextField fullWidth size="small" select>
              {data?.data.map((option: any, index: any) => (
                <MenuItem key={index} value={option.name}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Box mt={3}>
            <Typography mb={1} variant="body2" color="primary">
              Service Name
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Service Name"
              size="small"
            />
          </Box>
          <Box mt={3}>
            <Typography mb={1} variant="body2" color="primary">
              Service Price
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter Service Price"
              size="small"
            />
          </Box>
          <Box mt={3}>
            <Typography mb={1} variant="body2" color="primary">
              Overview
            </Typography>
            <ReactQuill
              onChange={(v: string) => console.log(v)}
              id="overview"
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default Overview;
