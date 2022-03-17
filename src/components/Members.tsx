import { Avatar, AvatarProps, Tooltip } from "@mui/material";
import { Box } from "@mui/system";

interface MembersProps {
  data: Array<{ title?: string; src?: string }>;
}

function Members({ data }: MembersProps) {
  return (
    <Box
      sx={{
        display: "flex",
        "& > div:not(:first-child)": {
          marginLeft: "-10px",
        },
      }}
    >
      {/* {data.map((x, i) => {
        if (x.title === "") {
          console.log(x);
        }
      })} */}
      {data.map((member, i) => (
        <Member title={member.title} src={member.src} key={i} />
      ))}
    </Box>
  );
}

export default Members;

interface Props extends AvatarProps {
  title?: string;
  src?: string;
}

const Member = function ({ title, src, ...props }: Props) {
  return (
    <>
      <Tooltip title={title ? title : "no title"}>
        {title ? (
          <Avatar {...props} sx={{ border: "2px solid white" }}>
            {title[0]}
          </Avatar>
        ) : (
          <Avatar {...props} src={src}></Avatar>
        )}
      </Tooltip>
    </>
  );
};
