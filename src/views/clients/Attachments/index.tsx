import { Box } from "@mui/system";
import { getStorage } from "api/storage";
import Loader from "components/Loader";
import useParams from "hooks/useParams";
import { useQuery, UseQueryResult } from "react-query";
import { useRouteMatch } from "react-router-dom";
import AddAttachment from "./AddAttachment";
import BreadCrumbs from "./BreadCrumbs";
import Files from "./Files";
import Folders from "./Folders";

interface StorageResponse {
  data: {
    result: any[];
    breadCrumbs: [];
  };
}

function Attachments() {
  const match: any = useRouteMatch();
  const params = useParams();

  let query = {
    clientId: match.params.clientId,
    folderId: params.get("folderId"),
  };
  const { data, isLoading }: UseQueryResult<StorageResponse, Error> = useQuery(
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
