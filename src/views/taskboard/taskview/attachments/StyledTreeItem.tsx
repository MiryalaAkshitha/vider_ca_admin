import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { StyledTreeItemRoot } from "views/taskboard/styled";
import FolderOpenOutlinedIcon from "@mui/icons-material/FolderOpenOutlined";
import { Checkbox, FormControlLabel } from "@mui/material";
import { icons } from "assets";
import { useMutation } from "react-query";
import { getStorageMutation } from "api/storage";
import useParams from "hooks/useParams";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function StyledTreeItem(props) {
  const { item, nodeId } = props;
  const [data, setData] = useState([]);
  const params = useParams();

  const { mutate } = useMutation(getStorageMutation, {
    onSuccess: (res: any) => {
      console.log(res.data);
      setData(res.data?.result);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleClick = () => {
    console.log(params);
    mutate({ clientId: params.get("clientId")!, folderId: item?.uid });
  };

  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      collapseIcon={item?.type === "folder" && <ArrowDropDownIcon />}
      expandIcon={<ArrowRightIcon />}
      label={<TreeLabel item={item} onClick={handleClick} />}
      children={
        <>
          {data.map((item: any) => (
            <StyledTreeItem item={item} nodeId={item?.uid} />
          ))}
        </>
      }
    />
  );
}

const TreeLabel = ({ item, onClick }: { item: any; onClick: () => void }) => {
  return (
    <>
      {item?.type === "folder" ? (
        <Box
          onClick={onClick}
          sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}
        >
          <img style={{ marginRight: 20 }} src={icons.folder} alt="" />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {item?.name}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "center", p: 0.5, pr: 0 }}>
          <Checkbox sx={{ ml: -1 }} size="small" />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {item?.name}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default StyledTreeItem;
