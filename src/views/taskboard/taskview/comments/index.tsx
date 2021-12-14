import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTaskComments } from "api/services/tasks";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ResponseType } from "types";
import TaskComment from "./Comment";
import CommentInput from "./CommentInput";

function Comments() {
  const params: any = useParams();

  const { data, isLoading }: ResponseType = useQuery(
    ["task-comments", params.taskId],
    getTaskComments
  );

  if (isLoading) return <Loader />;

  return (
    <>
      <Typography variant="subtitle1" color="primary">
        Comments
      </Typography>
      <CommentInput />
      <Box>
        {data?.data?.map((comment: any, index: number) => (
          <TaskComment data={comment} key={index} />
        ))}
      </Box>
    </>
  );
}

export default Comments;
