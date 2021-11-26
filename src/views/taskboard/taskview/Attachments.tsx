import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTaskAttachments } from "api/tasks";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { DataResponseType } from "types/createTask.types";
import NoAttachments from "./attachments/NoAttachments";
import UploadAttachmentModal from "./attachments/UploadAttachmentModal";

function Attachments() {
  const params: any = useParams();
  const [open, setOpen] = useState<boolean>(false);

  const { data, isLoading }: DataResponseType = useQuery(
    ["task-attachments", params.taskId],
    getTaskAttachments,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loader />;
  return (
    <Box p={2}>
      <Typography variant="subtitle2" color="primary">
        Attachments
      </Typography>
      <Box>
        {data?.data?.length ? (
          data?.data?.map((comment: any, index: number) => <h1>hello</h1>)
        ) : (
          <NoAttachments action={() => setOpen(true)} />
        )}
      </Box>
      <UploadAttachmentModal open={open} setOpen={setOpen} />
    </Box>
  );
}

export default Attachments;
