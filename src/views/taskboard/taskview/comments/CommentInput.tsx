import { SendOutlined } from "@mui/icons-material";
import { IconButton, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { addComment } from "api/tasks";
import useSnack from "hooks/useSnack";
import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useParams } from "react-router";
import { InputChangeType, SubmitType } from "types";

function CommentInput() {
  const snack = useSnack();
  const queryClient = useQueryClient();
  const [comment, setComment] = useState("");
  const params: any = useParams();

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

  const handleChange = (event: InputChangeType) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: SubmitType) => {
    event.preventDefault();
    if (!comment) return;
    mutate({ taskId: params.taskId, data: { text: comment } });
  };

  return (
    <Box mt={2} position="relative">
      <form onSubmit={handleSubmit}>
        <TextField
          multiline
          rows={5}
          InputProps={{
            sx: { pr: 10 },
          }}
          size="medium"
          onChange={handleChange}
          fullWidth
          value={comment}
          placeholder="Write a comment here…"
        />
        <Box position="absolute" right={20} bottom={10}>
          <IconButton type="submit" disabled={!comment}>
            <SendOutlined
              sx={{ opacity: comment ? 1 : "0.5" }}
              color="secondary"
            />
          </IconButton>
        </Box>
      </form>
    </Box>
  );
}

export default CommentInput;
