import { Grid } from "@mui/material";
import File from "views/storage/Files/File";

function Files({ data }) {
  return (
    <>
      {data?.map((item: any, index: number) => (
        <Grid item md={4} lg={3} xl={2} key={index}>
          <File data={item} />
        </Grid>
      ))}
    </>
  );
}

export default Files;
