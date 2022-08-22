import { Breadcrumbs, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getPermissions, getRole, updateRole } from "api/services/roles";
import BottomBar from "components/BottomBar";
import { LinkRouter } from "components/BreadCrumbs";
import Loader from "components/Loader";
import { snack } from "components/toast";
import useQueryParams from "hooks/useQueryParams";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import Permissions from "views/settings/manage-users/roles-permissions/Permissions";
import RoleInfo from "views/settings/manage-users/roles-permissions/RoleInfo";

function ViewProfile() {
  const params: any = useParams();
  const [originalState, setOriginalState] = useState<number[]>([]);
  const [permissions, setPermissons] = useState<number[]>([]);
  const { queryParams, setQueryParams } = useQueryParams();

  const { data: permissionsData, isLoading: permissionsLoading }: ResType = useQuery(
    "permissions",
    getPermissions
  );

  const parentGrouped = _.groupBy(permissionsData?.data, "parentLabel");
  const active = queryParams.tab || Object.keys(parentGrouped)[0];
  const labelGrouped = _.groupBy(parentGrouped[active], "label");

  const { data, isLoading }: ResType = useQuery(["role", params.roleId], getRole, {
    onSuccess: (res: any) => {
      let result = res.data?.permissions?.map((item: any) => item?.id) || [];
      setOriginalState(result);
      setPermissons(result);
    },
  });

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
      data: { permissions },
    });
  };

  if (isLoading || permissionsLoading) return <Loader />;

  return (
    <>
      <Breadcrumbs sx={{ p: 2 }}>
        <LinkRouter underline="hover" color="inherit" to="/settings/roles-permissions">
          Roles & Permissions
        </LinkRouter>
        <Typography>{data?.data?.name}</Typography>
      </Breadcrumbs>
      <RoleInfo data={data?.data} />
      <Box p={3} pb={12}>
        <Typography sx={{ mb: 1 }} variant="subtitle1">
          Permissions
        </Typography>
        <Box display="flex" gap={2}>
          <Box>
            <List
              sx={{
                width: 200,
                borderRight: "1px solid #e0e0e0",
                position: "sticky",
                top: 180,
                py: 0,
              }}
            >
              {Object.keys(parentGrouped)?.map((item: any) => (
                <ListItemButton
                  onClick={() => setQueryParams({ tab: item })}
                  selected={active === item}
                  sx={{
                    ...(active === item && {
                      borderRight: "3px solid red",
                      borderRadius: "2px",
                    }),
                  }}
                >
                  <ListItemText primary={<Typography variant="body2">{item}</Typography>} />
                </ListItemButton>
              ))}
            </List>
          </Box>
          <Box flex={1}>
            {Object.keys(labelGrouped)?.map((key: any) => (
              <Permissions
                label={key}
                data={labelGrouped[key]}
                permissions={permissions}
                handlePermissionChange={handlePermissionChange}
              />
            ))}
          </Box>
        </Box>
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
