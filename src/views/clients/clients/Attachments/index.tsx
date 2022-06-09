import { Box } from "@mui/system";
import { getStorage } from "api/services/storage";
import EmptyPage from "components/EmptyPage";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import moment from "moment";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { StorageResponse } from "types";
import { Permissions } from "utils/permissons";
import AddAttachment from "./AddAttachment";
import BreadCrumbs from "./BreadCrumbs";
import Files from "./Files";
import Folders from "./Folders";
import Search from "./Search";

function Attachments() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  const query = {
    clientId: params.clientId || "",
    folderId: searchParams.get("folderId"),
    type: "client",
  };
  const { data, isLoading }: StorageResponse = useQuery(
    ["storage", query],
    getStorage
  );

  const getFilesOrFolders = (type: "folder" | "file") => {
    let soryBy = searchParams.get("sortBy");
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
            {getFilesOrFolders("folder")?.length ? (
              <Folders data={getFilesOrFolders("folder")} />
            ) : null}
            {getFilesOrFolders("file")?.length ? (
              <Files data={getFilesOrFolders("file")} />
            ) : null}
          </>
        ) : (
          <EmptyPage
            minHeight="60vh"
            title="No files or folders found"
            desc="Add folder or file to your storage"
          />
        )}
      </Box>
      <ValidateAccess name={Permissions.CREATE_CLIENT_STORAGE}>
        <AddAttachment />
      </ValidateAccess>
    </>
  );
}

export default Attachments;
