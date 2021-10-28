import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Folder from "./Folder";

function Folders({ data }: any) {
  return (
    <Box>
      <Typography variant='subtitle2' sx={{ mb: 2 }} color='primary'>
        Folders
      </Typography>
      <Grid container spacing={2}>
        {data.map((item) => (
          <Grid item xl={2} lg={3} key={item?.id}>
            <Folder data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Folders;
