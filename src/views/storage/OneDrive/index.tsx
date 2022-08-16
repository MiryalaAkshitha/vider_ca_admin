import { Box, Button, Grid, Typography } from "@mui/material";
import { getOneDriveItems } from "api/services/onedrive";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { ResType } from "types";
import BreadCrumbs from "./BreadCrumbs";
import File from "./File";
import Folder from "./Folder";

function OneDrive() {
  const { queryParams } = useQueryParams();

  const { data, isLoading, isError, error }: ResType = useQuery(
    ["onedrive-items", { id: queryParams.folderId || "root" }],
    getOneDriveItems,
    { retry: false }
  );

  if (isLoading) return <Loader />;

  const err = error?.response?.data;

  const authorize = () => {
    window.location.href = err?.authorizationUrl;
  };

  const folders = data?.data?.value?.filter((item: any) => {
    return Boolean(item?.folder);
  });

  const files = data?.data?.value?.filter((item: any) => {
    return Boolean(item?.file);
  });

  return (
    <>
      {isError && err?.code === "NO_TOKEN" && (
        <Box textAlign="center" mt={20}>
          <Typography variant="subtitle1" mb={3}>
            You need to authorize this app to access OneDrive.
          </Typography>
          <Button color="secondary" variant="contained" onClick={authorize}>
            Authorize
          </Button>
        </Box>
      )}
      <BreadCrumbs />
      {folders?.length > 0 && (
        <Box mt={4}>
          <Typography variant="subtitle2" sx={{ mb: 2 }} color="primary">
            Folders
          </Typography>
          <Grid container spacing={2}>
            {folders?.map((item: any) => (
              <Grid item key={item?.id}>
                <Folder data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
      {files?.length > 0 && (
        <Box mt={4}>
          <Typography variant="subtitle2" sx={{ mb: 2 }} color="primary">
            Files
          </Typography>
          <Grid container spacing={2}>
            {files?.map((item: any) => (
              <Grid item xl={2} lg={3} key={item?.id}>
                <File data={item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
}

export default OneDrive;
