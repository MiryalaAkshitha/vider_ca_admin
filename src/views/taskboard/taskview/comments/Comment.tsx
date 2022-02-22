import { Avatar, Button, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import moment from "moment";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentRoundedIcon from "@mui/icons-material/CommentRounded";
import { useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import { SendOutlined } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import useSnack from "hooks/useSnack";
import { addComment } from "api/services/tasks";
import { useMutation, useQueryClient } from "react-query";

type Props = {
  data: any;
  users: any;
};

function TaskComment({ data, users }: Props) {
  const params: any = useParams();
  const snack = useSnack();
  const [showReply, setShowReply] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [reply, setReply] = useState("");
  const queryClient = useQueryClient();

  const { mutate } = useMutation(addComment, {
    onSuccess: () => {
      snack.success("Comment Added");
      setReply("");
      setShowReply(false);
      setShowComments(true);
      queryClient.invalidateQueries("task-comments");
    },
    onError: (err: any) => {
      snack.error(err.response.data.message);
    },
  });

  const onReply = () => {
    if (!reply) return;
    mutate({
      taskId: params.taskId,
      data: { text: reply, parentId: data?.id },
    });
  };

  const reg = /@\[+[a-z\s]+\]/gi;
  const getText = (text: string) =>
    text.replace(reg, function (str) {
      return `<span style='color:red'>
      ${str.replace("[", "")?.replace("]", "")} </span>`;
    });

  return (
    <Box mt={4} borderBottom="1px solid rgba(0,0,0,0.08)" pb={3}>
      <Box maxWidth={1000}>
        <Box mb="8px" display="flex" gap={2} alignItems="center">
          <Avatar src="https://picsum.photos/200" />
          <div>
            <Typography variant="body1" sx={{ lineHeight: "18px" }}>
              {data?.user?.firstName + " " + data?.user?.lastName}
            </Typography>
            <Typography
              variant="caption"
              sx={{ fontSize: 10 }}
              color="rgba(0,0,0,0.5)"
            >
              {moment(data?.createdAt).calendar()}
            </Typography>
          </div>
        </Box>
        <Typography variant="body2" color="rgba(0,0,0,0.8)">
          <span
            dangerouslySetInnerHTML={{
              __html: getText(data?.text),
            }}
          ></span>
        </Typography>
        <Box display="flex" gap={3} mt={2}>
          <Button
            sx={{
              minWidth: 80,
              color: "rgba(0,0,0,0.7)",
              background: showReply ? "rgba(0,0,0,0.08)" : "",
            }}
            size="small"
            onClick={() => setShowReply(!showReply)}
            startIcon={<ReplyRoundedIcon />}
          >
            Reply
          </Button>
          <Button
            sx={{
              minWidth: 80,
              color: "rgba(0,0,0,0.7)",
              background: showComments ? "rgba(0,0,0,0.08)" : "",
            }}
            size="small"
            onClick={() => {
              setShowComments(!showComments);
            }}
            startIcon={<CommentRoundedIcon fontSize="small" />}
          >
            Comments {data?.replies?.length > 0 && `(${data?.replies?.length})`}
          </Button>
        </Box>
        {showReply && (
          <Box position="relative" mt={2}>
            <MentionsInput
              autoFocus
              className="mentions_input"
              value={reply}
              placeholder="Write a comment here and type @ to mention someone...."
              onChange={(e: any) => {
                setReply(e.target.value);
              }}
            >
              <Mention
                appendSpaceOnAdd
                markup="@[__display__]"
                trigger="@"
                displayTransform={(id: string, display: string) =>
                  `@${display}`
                }
                style={{
                  backgroundColor: "rgba(233, 107, 116, 0.2)",
                  borderRadius: 4,
                }}
                data={users?.map((user: any) => ({
                  id: user.id,
                  display: `${user.firstName} ${user.lastName}`,
                }))}
              />
            </MentionsInput>
            <Box position="absolute" right={20} bottom={10}>
              <IconButton onClick={onReply} disabled={!reply}>
                <SendOutlined
                  sx={{ opacity: reply ? 1 : "0.5" }}
                  color="secondary"
                />
              </IconButton>
            </Box>
          </Box>
        )}
        {showComments && data?.replies?.length > 0 && (
          <Box mt={2} ml={2}>
            {data?.replies?.map((item: any) => (
              <Box mb={2}>
                <Box mb={1} display="flex" gap={2} alignItems="center">
                  <Avatar src="https://picsum.photos/200" />
                  <div>
                    <Typography variant="body1" sx={{ lineHeight: "18px" }}>
                      {item?.user?.firstName + " " + item?.user?.lastName}
                    </Typography>
                    <Typography variant="caption" color="rgba(0,0,0,0.5)">
                      {moment(item?.createdAt).calendar()}
                    </Typography>
                  </div>
                </Box>
                <Typography variant="body2" color="rgba(0,0,0,0.8)">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: getText(item?.text),
                    }}
                  ></span>
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default TaskComment;
