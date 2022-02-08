import ArticleIcon from "@mui/icons-material/Article";
import FolderIcon from "@mui/icons-material/Folder";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { searchStorage } from "api/services/storage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Search() {
  const params = useParams();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const query = {
    clientId: params.clientId || "",
  };

  const { mutate, data, isLoading }: any = useMutation(searchStorage);

  const searchFolders = data?.data?.result?.filter(
    (item: any) => item.type === "folder"
  );
  const searchFiles = data?.data?.result?.filter(
    (item: any) => item.type === "file"
  );

  return (
    <Box px={4} pt={2} display="flex" justifyContent="flex-end">
      <Box position="relative">
        <SearchContainer
          minWidth="350px"
          debounced
          placeHolder="Search"
          onChange={(v) => {
            setSearch(v);
            mutate({
              ...query,
              search: v,
            });
          }}
        />
        {search && (
          <Paper
            sx={{
              width: "100%",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
              position: "absolute",
              top: "100%",
              left: 0,
              minHeight: "200px",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {isLoading ? (
              <Loader minHeight={200} />
            ) : (
              <div>
                {!searchFolders?.length && !searchFiles?.length ? (
                  <Typography
                    sx={{ mt: 3, textAlign: "center" }}
                    variant="subtitle2"
                  >
                    No results
                  </Typography>
                ) : (
                  <div>
                    {searchFolders?.map((item: any) => (
                      <MenuItem
                        onClick={() => {
                          navigate(`${location.pathname}?folderId=${item.uid}`);
                          setSearch("");
                        }}
                        sx={{ p: 1 }}
                      >
                        <ListItemIcon>
                          <FolderIcon sx={{ color: "#07050566" }} />
                        </ListItemIcon>
                        <ListItemText>{item?.name}</ListItemText>
                      </MenuItem>
                    ))}
                    {searchFiles?.map((item: any) => (
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
                    ))}
                  </div>
                )}
              </div>
            )}
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default Search;
