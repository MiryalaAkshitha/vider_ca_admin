import { Breadcrumbs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getPermissions, getRole, updateRole } from "api/services/roles";
import BottomBar from "components/BottomBar";
import { LinkRouter } from "components/BreadCrumbs";
import Loader from "components/Loader";
import { snack } from "components/toast";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery, UseQueryResult } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import PermissonsAccordion from "views/settings/manage-users/roles-permissions/PermissionAccordion";
import RoleInfo from "views/settings/manage-users/roles-permissions/RoleInfo";

function ViewProfile() {
  const params: any = useParams();
  const [originalState, setOriginalState] = useState<number[]>([]);
  const [permissions, setPermissons] = useState<number[]>([]);

  const { data: permissionsData, isLoading: permissionsLoading }: ResType =
    useQuery("permissions", getPermissions);

  const { data, isLoading }: UseQueryResult<{ data: any }, Error> = useQuery(
    ["role", params.roleId],
    getRole,
    {
      onSuccess: (res: any) => {
        let result = res.data?.permissions?.map((item: any) => item?.id) || [];
        setOriginalState(result);
        setPermissons(result);
      },
    }
  );

  const { mutateAsync } = useMutation(updateRole, {
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

  const handleUpdatePermissons = async () => {
    await mutateAsync({
      id: data?.data?.id,
      data: {
        permissions,
      },
    });
  };

  if (isLoading || permissionsLoading) return <Loader />;

  return (
    <>
      <Breadcrumbs sx={{ p: 2 }}>
        <LinkRouter
          underline="hover"
          color="inherit"
          to="/settings/roles-permissions"
        >
          Roles & Permissions
        </LinkRouter>
        <Typography>{data?.data?.name}</Typography>
      </Breadcrumbs>
      <RoleInfo data={data?.data} />
      <Box p={3} pb={12} maxWidth={800}>
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
      <BottomBar
        data={originalState}
        state={permissions}
        onCancel={() => setPermissons(originalState)}
        onUpdate={handleUpdatePermissons}
      />
    </>
  );
}

export default ViewProfile;
