import { Breadcrumbs, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getPermissions, getRole, updateRole } from "api/services/roles";
import { LinkRouter } from "components/BreadCrumbs";
import Loader from "components/Loader";
import { snack } from "components/toast";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { useParams } from "react-router-dom";
import { DataResponse } from "types";
import PermissonsAccordion from "views/settings/roles-permissions/PermissionAccordion";

type PermissionsDataResponse = UseQueryResult<DataResponse, Error>;

function ViewProfile() {
  const params: any = useParams();
  const [permissions, setPermissons] = useState<number[]>([]);

  const {
    data: permissionsData,
    isLoading: permissionsLoading,
  }: PermissionsDataResponse = useQuery("permissions", getPermissions);

  const { data, isLoading }: UseQueryResult<{ data: any }, Error> = useQuery(
    ["role", params.roleId],
    getRole,
    {
      onSuccess: (res: any) => {
        setPermissons(
          res.data?.permissions?.map((item: any) => item?.id) || []
        );
      },
    }
  );

  const { mutate } = useMutation(updateRole, {
    onSuccess: () => {
      snack.success("Permissions Updated");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handlePermissionChange = (id: number) => {
    let filtered: number[] = [...permissions];
    if (permissions.includes(id)) {
      filtered = permissions.filter((item: any) => item !== id);
    } else {
      filtered.push(id);
    }
    setPermissons(filtered);
  };

  const handleUpdatePermissons = () => {
    mutate({
      id: data?.data?.id,
      data: {
        permissions,
      },
    });
  };

  if (isLoading || permissionsLoading) return <Loader />;

  return (
    <div>
      <Breadcrumbs>
        <LinkRouter
          underline="hover"
          color="inherit"
          to="/settings/roles-permissions"
        >
          Roles
        </LinkRouter>
        <Typography>{data?.data?.name}</Typography>
      </Breadcrumbs>
      <Box
        display="flex"
        gap={10}
        mt={3}
        bgcolor="#FBF9F2"
        borderRadius={4}
        p={3}
      >
        <Box>
          <Typography variant="body1" gutterBottom color="primary">
            Role Name
          </Typography>
          <Typography variant="body2" color="rgba(0,0,0,0.6)">
            {data?.data?.name}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom color="primary">
            Created On
          </Typography>
          <Typography variant="body2" color="rgba(0,0,0,0.6)">
            {moment(data?.data?.createdAt).format("YYYY-MM-DD")}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" gutterBottom color="primary">
            Status
          </Typography>
          <Typography variant="body2" color="rgba(0,0,0,0.6)">
            {data?.data?.active ? "Active" : "Inactive"}
          </Typography>
        </Box>
        <Box flex={1} textAlign="right">
          <Button
            onClick={handleUpdatePermissons}
            color="secondary"
            variant="outlined"
          >
            Save
          </Button>
        </Box>
      </Box>
      <Box mt={3} maxWidth={800}>
        <Typography sx={{ mb: 2 }} variant="subtitle1">
          Permissions
        </Typography>
        {Object.keys(_.groupBy(permissionsData?.data, "label"))?.map(
          (key, index) => (
            <PermissonsAccordion
              label={key}
              data={_.groupBy(permissionsData?.data, "label")[key]}
              permissions={permissions}
              key={index}
              handlePermissionChange={handlePermissionChange}
            />
          )
        )}
      </Box>
    </div>
  );
}

export default ViewProfile;
