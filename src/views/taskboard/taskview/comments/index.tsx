import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTaskComments } from "api/tasks";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { DataResponseType } from "types/createTask.types";
import TaskComment from "./Comment";
import CommentInput from "./CommentInput";

function Comments() {
  const params: any = useParams();

  const { data, isLoading }: DataResponseType = useQuery(
    ["task-comments", params.taskId],
    getTaskComments,
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <Loader />;

  return (
    <Box p={2}>
      <Typography variant="subtitle1" color="primary">
        Comments
      </Typography>
      <CommentInput />
      <Box>
        {data?.data?.map((comment: any, index: number) => (
          <TaskComment data={comment} key={index} />
        ))}
      </Box>
    </Box>
  );
}

export default Comments;
