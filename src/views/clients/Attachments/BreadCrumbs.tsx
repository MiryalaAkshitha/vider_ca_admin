import { Breadcrumbs } from "@mui/material";
import { Box } from "@mui/system";
import { Link, useLocation } from "react-router-dom";

function BreadCrumbs({ data }: any) {
  const location: any = useLocation();

  return (
    <Box mb={3}>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Link
          to={`${location.pathname}`}
          style={{ color: "initial", textDecoration: "none" }}
        >
          Home
        </Link>
        {data.map((item: any, index: number) => (
          <Link
            key={index}
            to={`${location.pathname}?folderId=${item?.uid}`}
            style={{ color: "initial", textDecoration: "none" }}
          >
            {item?.name}
          </Link>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

export default BreadCrumbs;
