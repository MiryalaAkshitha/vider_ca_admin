import { Box } from "@mui/system";
import { getStorage } from "api/services/storage";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { StorageResponse } from "types";
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
  };
  const { data, isLoading }: StorageResponse = useQuery(
    ["storage", query],
    getStorage
  );

  const folders = data?.data?.result?.filter((item) => item.type === "folder");
  const files = data?.data?.result?.filter((item) => item.type === "file");

  if (isLoading) return <Loader />;

  return (
    <>
      <Search />
      <Box px={4} py={2} width="90%">
        {data?.data.breadCrumbs.length ? (
          <BreadCrumbs data={data?.data?.breadCrumbs} />
        ) : null}
        {folders?.length ? <Folders data={folders} /> : null}
        {files?.length ? <Files data={files} /> : null}
        <AddAttachment />
      </Box>
    </>
  );
}

export default Attachments;
