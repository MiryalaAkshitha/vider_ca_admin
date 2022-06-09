import { Breadcrumbs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import useQueryParams from "hooks/useQueryParams";

function BreadCrumbs({ data }: any) {
  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <Box mb={3}>
      <Breadcrumbs maxItems={4} aria-label="breadcrumb">
        <Typography
          variant="body1"
          color="primary"
          sx={{
            cursor: "pointer",
          }}
          onClick={() => {
            delete queryParams.folderId;
            setQueryParams({
              ...queryParams,
            });
          }}
        >
          Home
        </Typography>
        {data.map((item: any, index: number) => (
          <Typography
            variant="body1"
            color="primary"
            key={index}
            sx={{
              cursor: "pointer",
            }}
            onClick={() =>
              setQueryParams({
                ...queryParams,
                folderId: item?.uid,
              })
            }
          >
            {item?.name}
          </Typography>
        ))}
      </Breadcrumbs>
    </Box>
  );
}

export default BreadCrumbs;
