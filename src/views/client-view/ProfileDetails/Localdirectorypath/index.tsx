import { Add } from "@mui/icons-material";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import AddLocaldirectorypath from "./AddLocaldirectorypath";
import Localdirectorypath from "./Localdirectorypath";

type Props = {
  data: any;
  state: any;
  setState: any;
  apiData: any
};

function LocaldirectorypathDetails({ state, data, setState, apiData }: Props) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Box mt={5}>
      <Typography color="primary" variant="h6" sx={{ mb: 1 }}>
        Local Directory Paths
      </Typography>
      <Grid container spacing={2}>

        {data?.localDirectoryPath && data?.localDirectoryPath.map((item: any, index: number) => (
          <Grid item xl={4} lg={6}>
            <Localdirectorypath key={index} index={index} state={state} data={data} setState={setState} apiData={data?.data} /> 
          </Grid>
        ))}

      </Grid>
      <Box mt={2}>
        <Button
          onClick={() => setOpen(true)}
          variant="outlined"
          color="secondary"
          startIcon={<Add />}
        >
          Add New
        </Button>
      </Box>
      <AddLocaldirectorypath open={open} setOpen={setOpen} state={state} data={data} setState={setState} />
    </Box >
  );
}

export default LocaldirectorypathDetails;
