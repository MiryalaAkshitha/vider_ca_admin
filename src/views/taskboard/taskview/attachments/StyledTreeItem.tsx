import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { icons } from "assets";
import _ from "lodash";
import { StyledTreeItemRoot } from "views/taskboard/styles";

function StyledTreeItem(props) {
  const { item, nodeId, data, onFileChange } = props;

  return (
    <StyledTreeItemRoot
      nodeId={nodeId}
      collapseIcon={item?.type === "folder" && <ArrowDropDownIcon />}
      expandIcon={<ArrowRightIcon />}
      label={<TreeLabel item={item} onFileChange={onFileChange} />}
      {...(data[item?.id] && {
        children: (
          <>
            {_.orderBy(data[item?.id], ["type"], ["desc"])?.map(
              (item: any, index) => (
                <StyledTreeItem
                  item={item}
                  nodeId={item?.id?.toString()}
                  data={data}
                  onFileChange={onFileChange}
                  key={index}
                />
              )
            )}
          </>
        ),
      })}
    />
  );
}

const TreeLabel = ({ item, onFileChange }: any) => {
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
          <Checkbox
            sx={{ ml: -1 }}
            size="small"
            onChange={(e) => onFileChange(item?.id)}
          />
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
