import FolderIcon from "@mui/icons-material/Folder";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import useQueryParams from "hooks/useQueryParams";

const SearchFolderItem = ({ item, setSearch }: any) => {
  const { queryParams, setQueryParams } = useQueryParams();

  return (
    <MenuItem
      onClick={() => {
        setQueryParams({
          ...queryParams,
          folderId: item.uid,
        });
        setSearch("");
      }}
      sx={{ p: 1 }}
    >
      <ListItemIcon>
        <FolderIcon sx={{ color: "#07050566" }} />
      </ListItemIcon>
      <ListItemText>{item?.name}</ListItemText>
    </MenuItem>
  );
};

export default SearchFolderItem;
