import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import TreeView from "@mui/lab/TreeView";
import { getStorage, getStorageTree } from "api/storage";
import Loader from "components/Loader";
import useParams from "hooks/useParams";
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

  if (isLoading) return <Loader />;

  return (
    <>
      <TreeView
        aria-label="gmail"
        defaultExpanded={["3"]}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {/* {data?.data?.result.map((item, index) => (
          <StyledTreeItem nodeId={item?.uid} key={index} item={item} />
        ))} */}
      </TreeView>
    </>
  );
}

export default ClientLibrary;
