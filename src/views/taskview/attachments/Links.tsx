import { Grid } from "@mui/material";
import Link from "views/storage/Links/Link";

interface Props {
  data: any;
  xl?: number;
  lg?: number;
}

function Links({ data, xl, lg }: Props) {
  return (
    <>
      {data?.map((item: any) => (
        <Grid item xl={xl ?? 3} lg={lg ?? 3} key={item?.id}>
          <Link data={item} />
        </Grid>
      ))}
    </>
  );
}

export default Links;
