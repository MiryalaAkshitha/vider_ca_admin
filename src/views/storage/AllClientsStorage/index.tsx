import { Box } from "@mui/material";
import { getStorage } from "api/services/storage";
import useQueryParams from "hooks/useQueryParams";
import moment from "moment";
import { useQuery } from "react-query";
import { StorageResponse } from "types";
import BreadCrumbs from "views/clients/clients/Attachments/BreadCrumbs";
import ClientsList from "./ClientsList";
import Loader from "components/Loader";
import Search from "views/clients/clients/Attachments/Search";
import ClientDetails from "./ClientDetails";
import ValidateAccess from "components/ValidateAccess";
import { Permissions } from "utils/permissons";
import AddAttachment from "./AddAttachment";
import Files from "./Files";
import Folders from "./Folders";

function AllClientsStorage() {
  const { queryParams } = useQueryParams();

  const query = {
    folderId: queryParams.folderId,
    clientId: queryParams.clientId,
    type: "client",
  };

  const { data, isLoading }: StorageResponse = useQuery(
    ["storage", query],
    getStorage,
    { enabled: Boolean(queryParams.clientId) }
  );

  const getFilesOrFolders = (type: "folder" | "file") => {
    let soryBy = queryParams.sortBy;
    let result = data?.data?.result?.filter((item) => item.type === type);

    if (soryBy === "a_z") {
      result = result?.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (soryBy === "z_a") {
      result = result?.sort((a, b) => b.name.localeCompare(a.name));
    }

    if (soryBy === "date_newest") {
      result = result?.sort((a, b) => {
        return moment.utc(b?.createdAt).local().diff(moment(a.createdAt));
      });
    }

    if (soryBy === "date_oldest") {
      result = result?.sort((a, b) => {
        return moment.utc(a?.createdAt).local().diff(moment(b.createdAt));
      });
    }

    if (type === "file") {
      if (soryBy === "size_low_to_high") {
        result = [...(result || [])]?.sort((a, b) => a.fileSize - b.fileSize);
      }
      if (soryBy === "size_high_to_low") {
        result = [...(result || [])]?.sort((a, b) => b.fileSize - a.fileSize);
      }
    }

    return result;
  };

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
            {getFilesOrFolders("folder")?.length ? (
              <Folders data={getFilesOrFolders("folder")} />
            ) : null}
            {getFilesOrFolders("file")?.length ? (
              <Files data={getFilesOrFolders("file")} />
            ) : null}
            <ValidateAccess name={Permissions.CREATE_CLIENT_STORAGE}>
              <AddAttachment />
            </ValidateAccess>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default AllClientsStorage;
