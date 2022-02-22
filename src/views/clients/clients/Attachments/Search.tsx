import ArticleIcon from "@mui/icons-material/Article";
import FolderIcon from "@mui/icons-material/Folder";
import {
  ListItemIcon,
  ListItemText,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { searchStorage } from "api/services/storage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useQueryParams from "hooks/useQueryParams";
import { useRef, useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate, useParams } from "react-router-dom";

function Search() {
  const params = useParams();
  const { queryParams, setQueryParams } = useQueryParams();
  const [search, setSearch] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const fieldRef = useRef<HTMLInputElement | null>(null);

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
    <Box px={4} pt={2} display="flex" gap={2} justifyContent="flex-end">
      <TextField
        sx={{ minWidth: 100 }}
        value={queryParams.soryBy || ""}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => {
          setQueryParams({
            ...queryParams,
            soryBy: e.target.value,
          });
        }}
        SelectProps={{
          native: true,
          autoWidth: true,
          onClose: () => {
            if (fieldRef.current) {
              fieldRef.current.blur();
            }
          },
        }}
        size="small"
        select
        label="Sort By"
      >
        <option value="">None</option>
        <option value="size_low_to_high">Size(low-high)</option>
        <option value="size_high_to_low">Size(high-low)</option>
        <option value="a_z">A-Z</option>
        <option value="z_a">Z-A</option>
        <option value="date_oldest">Date Oldest</option>
        <option value="date_newest">Date Newest</option>
      </TextField>
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
              zIndex: 1,
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
