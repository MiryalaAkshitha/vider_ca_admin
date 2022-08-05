import { Box } from "@mui/system";
import { getStorage } from "api/services/storage";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import { usePermissions } from "context/PermissionsProvider";
import { Permissions } from "data/permissons";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";
import { setCurrentStorage, setPermissions } from "redux/reducers/storageSlice";
import { StorageResponse } from "types";
import AddAttachment from "views/storage/AddAttachment";
import BreadCrumbs from "views/storage/BreadCrumbs";
import FilesAndLinks from "views/storage/FilesAndLinks";
import Folders from "views/storage/Folders";
import { getFilesOrFolders } from "views/storage/getFilesOrFolders";
import Search from "views/storage/Search";

function Attachments() {
  const { permissions } = usePermissions();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setPermissions({
        write: permissions.includes(Permissions.CREATE_CLIENT_ATTACHMENTS),
        edit: permissions.includes(Permissions.EDIT_CLIENT_ATTACHMENTS),
        delete: permissions.includes(Permissions.DELETE_CLIENT_ATTACHMENTS),
      })
    );
  }, [dispatch, permissions]);

  const query = {
    clientId: params.clientId || "",
    folderId: searchParams.get("folderId"),
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
    sortBy: searchParams.get("sortBy") || "",
  });

  if (isLoading) return <Loader />;

  return (
    <>
      <Box px={4} py={2}>
        <Box display="flex" justifyContent="space-between">
          <Box>
            {data?.data.breadCrumbs.length ? (
              <BreadCrumbs data={data?.data?.breadCrumbs} />
            ) : null}
          </Box>
          <Search type="client" />
        </Box>
        {data?.data?.result?.length ? (
          <>
            {folders?.length ? <Folders data={folders} /> : null}
            <FilesAndLinks data={data} />
          </>
        ) : (
          <EmptyPage
            minHeight="60vh"
            title="No files or folders found"
            desc="Add folder or file to the storage"
          />
        )}
      </Box>
      <ValidateAccess name={Permissions.CREATE_CLIENT_STORAGE}>
        <AddAttachment type="client" />
      </ValidateAccess>
    </>
  );
}

export default Attachments;
