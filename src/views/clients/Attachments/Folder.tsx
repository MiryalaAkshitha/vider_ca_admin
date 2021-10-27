import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { icons } from "assets";
import useParams from "hooks/useParams";
import { Link, useRouteMatch } from "react-router-dom";

function Folder({ data }: any) {
  const match: any = useRouteMatch();
  const params = useParams();
  let existing = params.get("folderId");
  let folderId = existing ? `${existing}|${data?.uid}` : data?.uid;

  return (
    <Link
      style={{ textDecoration: "none", color: "initial" }}
      to={`${match.url}?folderId=${folderId}`}>
      <Box
        px={3}
        py={2}
        bgcolor='rgba(0,0,0,0.06)'
        sx={{
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: "10px",
          cursor: "pointer",
          display: "flex",
          gap: 2,
          alignItems: "center",
        }}>
        <img src={icons.folder} alt='' />
        <Typography variant='body2'>{data?.name}</Typography>
      </Box>
    </Link>
  );
}

export default Folder;
