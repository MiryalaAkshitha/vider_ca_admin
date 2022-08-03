import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getTaskComments } from "api/services/tasks/tasks";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import { ResType } from "types";
import TaskComment from "./Comment";
import CommentInput from "./CommentInput";

function Comments() {
  const params: any = useParams();

  const { data, isLoading }: ResType = useQuery(
    ["task-comments", params.taskId],
    getTaskComments
  );

  const { data: users, isLoading: usersLoading }: ResType = useQuery(
    "users",
    getUsers
  );

  if (isLoading || usersLoading) return <Loader />;

  return (
    <>
      <Typography variant="subtitle1" color="primary">
        Comments
      </Typography>
      <CommentInput users={users?.data} />
      <Box>
        {data?.data?.map((comment: any, index: number) => (
          <TaskComment users={users?.data} data={comment} key={index} />
        ))}
      </Box>
    </>
  );
}

export default Comments;
