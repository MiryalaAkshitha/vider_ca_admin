import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import File from "./File";

type Props = { data: any };

function Files({ data }: Props) {
  return (
    <Box mt={4}>
      <Typography variant="subtitle2" sx={{ mb: 2 }} color="primary">
        Files
      </Typography>
      <Grid container spacing={2}>
        {data.map((item: any) => (
          <Grid item xl={2} lg={3} md={4} key={item?.id}>
            <File data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Files;
