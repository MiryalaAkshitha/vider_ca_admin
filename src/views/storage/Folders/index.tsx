import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Folder from "./Folder";

type Props = { data: any; xl?: number; lg?: number };

function Folders({ data, xl, lg }: Props) {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 2 }} color="primary">
        Folders
      </Typography>
      <Grid container spacing={2}>
        {data.map((item: any) => (
          <Grid item xl={xl ?? 2} lg={lg ?? 3} key={item?.id}>
            <Folder data={item} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Folders;
