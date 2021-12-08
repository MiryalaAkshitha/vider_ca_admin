import TreeView from "@mui/lab/TreeView";
import { getStorageTree } from "api/storage";
import Loader from "components/Loader";
import useParams from "hooks/useParams";
import _ from "lodash";
import { useQuery, UseQueryResult } from "react-query";
import { StorageResponse } from "views/clients/Attachments";
import StyledTreeItem from "./StyledTreeItem";

function ClientLibrary() {
  const params: any = useParams();
  const search = new URLSearchParams(window.location.search);

  const { data, isLoading }: UseQueryResult<StorageResponse, Error> = useQuery(
    ["storage-tree", params.get("clientId")],
    getStorageTree
  );

  let treeData: any = _.groupBy(data?.data, "parent");

  let rootFolders = treeData["null"];

  if (isLoading) return <Loader />;

  return (
    <>
      <TreeView
        aria-label="gmail"
        defaultExpanded={["3"]}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {rootFolders?.map((item, index) => (
          <StyledTreeItem
            nodeId={item?.id}
            data={treeData}
            key={index}
            item={item}
          />
        ))}
      </TreeView>
    </>
  );
}

export default ClientLibrary;
