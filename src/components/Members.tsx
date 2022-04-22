import { Avatar, AvatarProps, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

interface MembersProps {
  data: Array<{ title: string; src?: string }>;
}

function Members({ data }: MembersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        "& > div:not(:first-of-type)": {
          marginLeft: "-10px",
        },
      }}
    >
      {data.map((member, i) => (
        <Member title={member.title} src={member.src} key={i} />
      ))}
    </Box>
  );
}

export default Members;

interface Props extends AvatarProps {
  title: string;
  src?: string;
}

const Member = function ({ title = "", src, ...props }: Props) {
  return (
    <Tooltip title={title}>
      {src ? (
        <Avatar
          sx={{
            border: "2px solid white",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
          }}
          {...props}
          src={src}
        ></Avatar>
      ) : (
        <Avatar
          {...props}
          sx={{
            border: "2px solid white",
            boxShadow: "0px 0px 5px rgba(0,0,0,0.1)",
          }}
        >
          {title[0]}
        </Avatar>
      )}
    </Tooltip>
  );
};
