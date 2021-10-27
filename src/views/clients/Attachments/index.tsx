import { Breadcrumbs, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStorage } from "api/storage";
import Loader from "components/Loader";
import useParams from "hooks/useParams";
import { useQuery, UseQueryResult } from "react-query";
import { useRouteMatch } from "react-router-dom";
import { DataResponse } from "types";
import AddAttachment from "./AddAttachment";
import Folder from "./Folder";
import { Link } from "react-router-dom";

interface StorageResponse {
  data: { result: any[]; breadCrumbs: [] };
}

function Attachments() {
  const match: any = useRouteMatch();
  const params = useParams();

  const { data, isLoading }: UseQueryResult<StorageResponse, Error> = useQuery(
    [
      "storage",
      {
        clientId: match.params.clientId,
        folderId: params.get("folderId"),
      },
    ],
    getStorage
  );

  if (isLoading) return <Loader />;

  return (
    <Box px={4} py={2}>
      <Box mb={3}>
        {data?.data.breadCrumbs.length ? (
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              to={`${match.url}`}
              style={{ color: "initial", textDecoration: "none" }}
            >
              Home
            </Link>
            {data?.data.breadCrumbs.map((item: any, index) => (
              <Link
                key={index}
                to={`${match.url}?folderId=${item?.uid}`}
                style={{ color: "initial", textDecoration: "none" }}
              >
                {item?.name}
              </Link>
            ))}
          </Breadcrumbs>
        ) : null}
      </Box>
      <Typography variant="subtitle2" sx={{ mb: 2 }} color="primary">
        Folders
      </Typography>
      <Grid container spacing={2}>
        {data?.data?.result?.map((item) => (
          <Grid item xs={2} key={item?.id}>
            <Folder data={item} />
          </Grid>
        ))}
      </Grid>
      <AddAttachment />
    </Box>
  );
}

export default Attachments;
