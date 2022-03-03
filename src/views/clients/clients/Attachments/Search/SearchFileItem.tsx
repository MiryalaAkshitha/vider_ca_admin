import ArticleIcon from "@mui/icons-material/Article";
import { ListItemIcon, MenuItem, Typography } from "@mui/material";

const SearchFileItem = ({ item, setSearch }: any) => {
  return (
    <a
      rel="noopener noreferrer"
      style={{ textDecoration: "none" }}
      target="_blank"
      href={item?.fileUrl}
    >
      <MenuItem
        onClick={() => {
          setSearch("");
        }}
        sx={{ p: 1 }}
      >
        <ListItemIcon>
          <ArticleIcon sx={{ color: "#ff181866" }} />
        </ListItemIcon>
        <Typography
          sx={{
            textOverflow: "ellipsis",
            width: "100%",
            overflow: "hidden",
          }}
        >
          {item?.name}
        </Typography>
      </MenuItem>
    </a>
  );
};

export default SearchFileItem;
