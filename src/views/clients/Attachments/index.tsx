import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStorage } from "api/storage";
import Loader from "components/Loader";
import useParams from "hooks/useParams";
import { useQuery, UseQueryResult } from "react-query";
import { useRouteMatch } from "react-router-dom";
import { DataResponse } from "types";
import AddAttachment from "./AddAttachment";
import Folder from "./Folder";

function Attachments() {
  const match: any = useRouteMatch();
  const params = useParams();

  let folderIds = params.get("folderId")?.split("|");
  let folderId = folderIds?.length ? folderIds[folderIds.length - 1] : null;

  const { data, isLoading }: UseQueryResult<DataResponse, Error> = useQuery(
    [
      "storage",
      {
        clientId: match.params.clientId,
        folderId,
      },
    ],
    getStorage
  );

  if (isLoading) return <Loader />;

  return (
    <Box px={4} py={2}>
      <Typography variant='subtitle2' sx={{ mb: 2 }} color='primary'>
        Folders
      </Typography>
      <Grid container spacing={2}>
        {data?.data.map((item) => (
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
