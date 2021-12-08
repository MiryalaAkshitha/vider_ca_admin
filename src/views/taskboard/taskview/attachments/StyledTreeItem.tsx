import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { icons } from "assets";
import { StyledTreeItemRoot } from "views/taskboard/styles";

function StyledTreeItem(props) {
  const { item, nodeId, data } = props;

  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      collapseIcon={item?.type === "folder" && <ArrowDropDownIcon />}
      expandIcon={<ArrowRightIcon />}
      label={<TreeLabel item={item} />}
      {...(data[item?.id] && {
        children: (
          <>
            {data[item?.id]?.map((item: any) => (
              <StyledTreeItem item={item} nodeId={item?.id} data={data} />
            ))}
          </>
        ),
      })}
    />
  );
}

const TreeLabel = ({ item }: any) => {
  return (
    <>
      {item?.type === "folder" ? (
        <Box sx={{ display: "flex", alignItems: "center", p: 1, pr: 0 }}>
          <img style={{ marginRight: 20 }} src={icons.folder} alt="" />
          <Typography
            variant="body2"
            sx={{ fontWeight: "inherit", flexGrow: 1 }}
          >
            {item?.name}
            {item?.parent}
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
