import { SendOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Box } from "@mui/system";
import { addComment } from "api/services/tasks";
import { snack } from "components/toast";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";

function CommentInput({ users }) {
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const params: any = useParams();
  const [focused, setFocused] = useState(false);

  const { mutate } = useMutation(addComment, {
    onSuccess: () => {
      snack.success("Comment Added");
      setComment("");
      setFocused(false);
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

  return (
    <Box mt={2} position="relative">
      <MentionsInput
        onFocus={() => setFocused(true)}
        className={`mentions_input ${focused ? "focused_mentions_input" : ""}`}
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
          data={users?.map((user: any) => ({
            id: user.id,
            display: user.fullName,
          }))}
        />
      </MentionsInput>
      <Box position="absolute" right={20} bottom={10}>
        <IconButton onClick={handleSubmit} disabled={!comment}>
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
