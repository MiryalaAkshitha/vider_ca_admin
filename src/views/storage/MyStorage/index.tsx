import { Box } from "@mui/system";
import { getStorage } from "api/services/storage";
import Loader from "components/Loader";
import ValidateAccess from "components/ValidateAccess";
import moment from "moment";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { StorageResponse } from "types";
import { Permissions } from "utils/permissons";
import BreadCrumbs from "views/clients/clients/Attachments/BreadCrumbs";
import Search from "views/clients/clients/Attachments/Search";
import AddAttachment from "./AddAttachment";
import Files from "./Files";
import Folders from "./Folders";

function Attachments() {
  const [searchParams] = useSearchParams();

  const query = {
    folderId: searchParams.get("folderId"),
    type: "organization",
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
      <Search type="organization" />
      <Box px={4} py={2}>
        {data?.data.breadCrumbs.length ? (
          <BreadCrumbs data={data?.data?.breadCrumbs} />
        ) : null}
        {getFilesOrFolders("folder")?.length ? (
          <Folders data={getFilesOrFolders("folder")} />
        ) : null}
        {getFilesOrFolders("file")?.length ? (
          <Files data={getFilesOrFolders("file")} />
        ) : null}
        <ValidateAccess name={Permissions.CREATE_STORAGE}>
          <AddAttachment />
        </ValidateAccess>
      </Box>
    </>
  );
}

export default Attachments;
