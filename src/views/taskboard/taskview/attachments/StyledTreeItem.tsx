import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Checkbox } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { icons } from "assets";
import _ from "lodash";
import { StyledTreeItemRoot } from "views/taskboard/styles";

interface Props {
  item: any;
  nodeId: string;
  data: any;
  onFileChange: (id: number) => void;
}

function StyledTreeItem(props: Props) {
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

type TreeLabelProps = {
  item: any;
  onFileChange: (id: number) => void;
};

const TreeLabel = ({ item, onFileChange }: TreeLabelProps) => {
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
        <label htmlFor={item?.id}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              p: 0.5,
              pr: 0,
              cursor: "pointer",
            }}
          >
            <Checkbox
              id={item?.id}
              sx={{ ml: -1 }}
              size="small"
              onChange={() => onFileChange(item?.id)}
            />
            <Typography
              variant="body2"
              sx={{ fontWeight: "inherit", flexGrow: 1 }}
            >
              {item?.name}
            </Typography>
          </Box>
        </label>
      )}
    </>
  );
};

export default StyledTreeItem;
