import TreeView from "@mui/lab/TreeView";
import { Box } from "@mui/system";
import { getStorageTree } from "api/storage";
import { addAttachmentsFromStorage } from "api/tasks";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import useSnack from "hooks/useSnack";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { StorageResponse } from "types";
import { GreyButton } from "views/taskboard/styles";
import StyledTreeItem from "./StyledTreeItem";

type Props = {
  setOpen: (v: boolean) => void;
};

function ClientLibrary({ setOpen }: Props) {
  const queryClient = useQueryClient();
  const params: any = useParams();
  const [searchParams] = useSearchParams();
  const snack = useSnack();
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  const { data, isLoading }: StorageResponse = useQuery(
    ["storage-tree", searchParams.get("clientId")],
    getStorageTree
  );

  const { mutate, isLoading: uploadLoading } = useMutation(
    addAttachmentsFromStorage,
    {
      onSuccess: () => {
        snack.success("Attachment(s) Added");
        setOpen(false);
        queryClient.invalidateQueries("task-attachments");
      },
      onError: (err: any) => {
        snack.error(err.response.data.message);
      },
    }
  );

  const handleFileChange = (id: number) => {
    if (selectedFiles.includes(id)) {
      setSelectedFiles(selectedFiles.filter((i) => i !== id));
      return;
    }
    setSelectedFiles([...selectedFiles, id]);
  };

  const handleUpload = () => {
    mutate({
      taskId: params.taskId,
      data: {
        fileIds: selectedFiles,
      },
    });
  };

  const treeData: any = _.groupBy(data?.data, "parent");
  const rootFolders = treeData["null"];

  if (isLoading) return <Loader minHeight={200} />;

  return (
    <>
      <TreeView
        aria-label="gmail"
        defaultExpanded={["3"]}
        defaultEndIcon={<div style={{ width: 24 }} />}
        sx={{ flexGrow: 1, maxWidth: 400, overflowY: "auto" }}
      >
        {_.orderBy(rootFolders, ["type"], ["desc"])?.map((item, index) => (
          <StyledTreeItem
            nodeId={item?.id?.toString()}
            data={treeData}
            onFileChange={handleFileChange}
            key={index}
            item={item}
          />
        ))}
      </TreeView>
      <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "center" }}>
        <LoadingButton
          title="Upload Files"
          disableElevation
          disabled={!selectedFiles.length}
          color="secondary"
          loading={uploadLoading}
          onClick={handleUpload}
        />
        <GreyButton onClick={() => setOpen(false)}>Cancel</GreyButton>
      </Box>
    </>
  );
}

export default ClientLibrary;
