import { Box } from "@mui/system";
import { getStorage } from "api/services/storage";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import { usePermissions } from "context/PermissionsProvider";
import useQueryParams from "hooks/useQueryParams";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { setCurrentStorage, setPermissions } from "redux/reducers/storageSlice";
import { StorageResponse } from "types";
import { Permissions } from "data/permissons";
import AddAttachment from "views/storage/AddAttachment";
import BreadCrumbs from "views/storage/BreadCrumbs";
import Files from "views/storage/Files";
import Folders from "views/storage/Folders";
import { getFilesOrFolders } from "views/storage/getFilesOrFolders";
import Search from "views/storage/Search";
import ClientDetails from "./ClientDetails";
import ClientsList from "./ClientsList";

function ClientStorage() {
  const { queryParams } = useQueryParams();
  const { permissions } = usePermissions();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPermissions({
        write: permissions.includes(Permissions.CREATE_CLIENT_STORAGE),
        edit: permissions.includes(Permissions.EDIT_CLIENT_STORAGE),
        delete: permissions.includes(Permissions.DELETE_CLIENT_STORAGE),
      })
    );
  }, [dispatch, permissions]);

  const query = {
    folderId: queryParams.folderId,
    clientId: queryParams.clientId,
    type: "client",
  };

  const { data, isLoading }: StorageResponse = useQuery(
    ["storage", query],
    getStorage,
    {
      onSuccess: (res: any) => {
        dispatch(setCurrentStorage(res?.data?.result));
      },
    }
  );

  let folders = getFilesOrFolders({
    type: "folder",
    data: data?.data?.result,
    sortBy: queryParams.soryBy || "",
  });

  let files = getFilesOrFolders({
    type: "file",
    data: data?.data?.result,
    sortBy: queryParams.soryBy || "",
  });

  if (isLoading) return <Loader />;

  return (
    <Box sx={{ display: "flex" }}>
      <ClientsList />
      <Box flex={1}>
        {isLoading ? (
          <Loader />
        ) : (
          <Box px={4} py={2}>
            <ClientDetails />
            <Search type="client" />
            {data?.data.breadCrumbs.length ? (
              <BreadCrumbs data={data?.data?.breadCrumbs} />
            ) : null}
            {folders?.length ? <Folders xl={3} lg={4} data={folders} /> : null}
            {files?.length ? <Files xl={4} lg={4} data={files} /> : null}
            <ValidateAccess name={Permissions.CREATE_CLIENT_STORAGE}>
              <AddAttachment type="client" />
            </ValidateAccess>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default ClientStorage;
