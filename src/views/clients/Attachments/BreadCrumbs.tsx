import { Breadcrumbs } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useRouteMatch } from "react-router-dom";

function BreadCrumbs({ data }: any) {
  const match: any = useRouteMatch();

  return (
    <Box mb={3}>
      <Breadcrumbs maxItems={4} aria-label='breadcrumb'>
        <Link
          to={`${match.url}`}
          style={{ color: "initial", textDecoration: "none" }}>
          Home
        </Link>
        {data.map((item: any, index) => (
          <Link
            key={index}
            to={`${match.url}?folderId=${item?.uid}`}
            style={{ color: "initial", textDecoration: "none" }}>
            {item?.name}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

export default BreadCrumbs;
