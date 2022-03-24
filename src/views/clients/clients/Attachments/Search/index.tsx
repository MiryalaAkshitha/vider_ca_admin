import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { searchStorage } from "api/services/storage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { StyledSearchList } from "views/clients/clients/styles";
import SearchFileItem from "./SearchFileItem";
import SearchFolderItem from "./SearchFolderItem";
import SortBy from "./SortBy";

interface Props {
  type: "client" | "organization";
}

function Search({ type }: Props) {
  const params = useParams();
  const { queryParams } = useQueryParams();
  const [search, setSearch] = useState("");

  const query = {
    clientId: params.clientId || queryParams.clientId || "",
  };

  const { mutate, data, isLoading }: any = useMutation(searchStorage);

  const handleSearch = (v: string) => {
    setSearch(v);
    mutate({
      ...query,
      type,
      search: v,
    });
  };

  const searchFolders = data?.data?.result?.filter(
    (item: any) => item.type === "folder"
  );
  const searchFiles = data?.data?.result?.filter(
    (item: any) => item.type === "file"
  );

  return (
    <Box px={4} pt={2} display="flex" gap={2} justifyContent="flex-end">
      <SortBy />
      <Box position="relative">
        <SearchContainer
          minWidth="350px"
          debounced
          placeHolder="Search"
          onChange={(v) => handleSearch(v)}
          value={search}
        />
        {search && (
          <StyledSearchList>
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
                    {searchFolders?.map((item: any, index: number) => (
                      <SearchFolderItem
                        item={item}
                        key={index}
                        setSearch={setSearch}
                      />
                    ))}
                    {searchFiles?.map((item: any, index: number) => (
                      <SearchFileItem
                        item={item}
                        key={index}
                        setSearch={setSearch}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </StyledSearchList>
        )}
      </Box>
    </Box>
  );
}

export default Search;
