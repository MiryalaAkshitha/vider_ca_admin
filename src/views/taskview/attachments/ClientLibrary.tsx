import TreeView from "@mui/lab/TreeView";
import { Box } from "@mui/system";
import { getStorageTree } from "api/services/storage";
import { addAttachmentsFromStorage } from "api/services/tasks";
import Loader from "components/Loader";
import LoadingButton from "components/LoadingButton";
import { useTaskData } from "context/TaskData";
import { snack } from "components/toast";
import _ from "lodash";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { StorageResponse } from "types";
import { GreyButton } from "views/tasks/styles";
import StyledTreeItem from "./StyledTreeItem";

type Props = {
  setOpen: (v: boolean) => void;
};

function ClientLibrary({ setOpen }: Props) {
  const queryClient = useQueryClient();
  const params: any = useParams();

  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const taskData: any = useTaskData();

  const { data, isLoading }: StorageResponse = useQuery(
    ["storage-tree", taskData?.client?.id],
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
        sx={{ flexGrow: 1, maxWidth: 400, minHeight: 300, overflowY: "auto" }}
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
