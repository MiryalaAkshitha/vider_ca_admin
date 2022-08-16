import { Box, Typography } from "@mui/material";
import { saveAuthToken } from "api/services/onedrive";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

function OneDriveAuth() {
  const navigate = useNavigate();
  const { queryParams } = useQueryParams();

  const { isError, error } = useQuery(
    ["save-token", { code: queryParams.code }],
    saveAuthToken,
    {
      onSuccess: () => {
        navigate("/storage/onedrive-storage");
      },
      enabled: Boolean(queryParams.code),
      retry: false,
    }
  );

  if (isError) {
    return <Box textAlign="center">{JSON.stringify(error)}</Box>;
  }

  return (
    <Box textAlign="center" mt={4}>
      <Typography mb={2} variant="subtitle1">
        Authorizing...
      </Typography>
      <Loader minHeight="60px" />
    </Box>
  );
}

export default OneDriveAuth;
