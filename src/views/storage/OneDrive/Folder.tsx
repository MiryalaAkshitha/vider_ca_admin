import { Typography } from "@mui/material";
import { icons } from "assets";
import useQueryParams from "hooks/useQueryParams";
import { StyledFolder } from "views/clients/styles";

function Folder({ data }) {
  const { queryParams, setQueryParams } = useQueryParams();
  const breadCrumbs = queryParams.breadCrumbs?.split("|") || [];

  const handleClick = () => {
    let newBreadCrumbs = [...breadCrumbs, `${data?.name}~${data?.id}`];
    setQueryParams({
      ...queryParams,
      folderId: data?.id,
      breadCrumbs: newBreadCrumbs.join("|"),
    });
  };

  return (
    <StyledFolder onClick={handleClick}>
      <img src={icons.folderIcon} style={{ width: 20 }} alt="" />
      <Typography variant="body2">{data?.name}</Typography>
    </StyledFolder>
  );
}

export default Folder;
