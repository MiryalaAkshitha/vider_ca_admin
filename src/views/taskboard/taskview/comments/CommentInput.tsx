import { SendOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { addComment } from "api/services/tasks";
import { getUsers } from "api/services/users";
import Loader from "components/Loader";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { ResType } from "types";

function CommentInput() {
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const params: any = useParams();

  const { data, isLoading }: ResType = useQuery("users", getUsers);

  const { mutate } = useMutation(addComment, {
    onSuccess: () => {
      snack.success("Comment Added");
      setComment("");
      queryClient.invalidateQueries("task-comments");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const handleSubmit = () => {
    if (!comment) return;
    mutate({ taskId: params.taskId, data: { text: comment } });
  };

  if (isLoading) return <Loader />;

  return (
    <Box mt={2} position="relative">
      <MentionsInput
        className="mentions_input"
        value={comment}
        placeholder="Write a comment here and type @ to mention someone...."
        onChange={(e) => {
          setComment(e.target.value);
        }}
      >
        <Mention
          appendSpaceOnAdd
          markup="@[__display__]"
          trigger="@"
          displayTransform={(id: string, display: string) => `@${display}`}
          style={{
            backgroundColor: "rgba(233, 107, 116, 0.2)",
            borderRadius: 4,
          }}
          data={data?.data?.map((user: any) => ({
            id: user.id,
            display: `${user.firstName} ${user.lastName}`,
          }))}
        />
      </MentionsInput>
      <Box position="absolute" right={20} bottom={10}>
        <IconButton onClick={handleSubmit} type="submit" disabled={!comment}>
          <SendOutlined
            sx={{ opacity: comment ? 1 : "0.5" }}
            color="secondary"
          />
        </IconButton>
      </Box>
    </Box>
  );
}

export default CommentInput;
