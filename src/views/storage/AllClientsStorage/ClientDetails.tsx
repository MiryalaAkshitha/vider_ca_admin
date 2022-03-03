import { Avatar, Box, Typography } from "@mui/material";
import { getClient } from "api/services/client";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useQuery } from "react-query";
import { ResType } from "types";
import { getTitle } from "utils";

function ClientDetails() {
  const { queryParams } = useQueryParams();

  const { data, isLoading }: ResType = useQuery(
    ["client", queryParams.clientId],
    getClient,
    { enabled: Boolean(queryParams.clientId) }
  );

  if (isLoading) return <Loader />;

  return (
    <Box
      sx={{
        background: "#FBF9F2",
        borderRadius: "8px",
        p: 2,
        display: "flex",
        justifyContent: "space-between",
        mb: 2,
      }}
    >
      <Box display="flex" gap={2} alignItems="center">
        <Avatar sx={{ width: 60, height: 60 }} src={data?.data?.imageUrl} />
        <div>
          <Typography variant="subtitle2">{data?.data?.displayName}</Typography>
          <Typography variant="body1" color="rgba(0,0,0,0.5)">
            {getTitle(data?.data?.category)}
          </Typography>
        </div>
      </Box>
      <Box textAlign="right">
        <Typography variant="body2" gutterBottom color="#149ECD">
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            href={`tel:${data?.data?.mobileNumber}`}
          >
            +91 {data?.data?.mobileNumber}
          </a>
        </Typography>
        <Typography variant="body2" color="#149ECD">
          <a
            style={{ color: "inherit", textDecoration: "none" }}
            href={`mailto:${data?.data?.email}`}
          >
            {data?.data?.email}
          </a>
        </Typography>
      </Box>
    </Box>
  );
}

export default ClientDetails;
