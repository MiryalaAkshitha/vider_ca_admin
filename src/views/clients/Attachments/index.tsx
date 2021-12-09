import { Box } from "@mui/system";
import { getStorage } from "api/storage";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { StorageResponse } from "types";
import AddAttachment from "./AddAttachment";
import BreadCrumbs from "./BreadCrumbs";
import Files from "./Files";
import Folders from "./Folders";

function Attachments() {
  const params = useParams();
  const [searchParams] = useSearchParams();

  let query = {
    clientId: params.clientId || "",
    folderId: searchParams.get("folderId"),
  };
  const { data, isLoading }: StorageResponse = useQuery(
    ["storage", query],
    getStorage
  );

  let folders = data?.data?.result?.filter((item) => item.type === "folder");
  let files = data?.data?.result?.filter((item) => item.type === "file");

  if (isLoading) return <Loader />;

  return (
    <Box px={4} py={2} width="90%">
      {data?.data.breadCrumbs.length ? (
        <BreadCrumbs data={data?.data?.breadCrumbs} />
      ) : null}
      {folders?.length ? <Folders data={folders} /> : null}
      {files?.length ? <Files data={files} /> : null}
      <AddAttachment />
    </Box>
  );
}

export default Attachments;
