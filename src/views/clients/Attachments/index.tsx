import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getStorage } from "api/services/storage";
import Loader from "components/Loader";
import SearchContainer from "components/SearchContainer";
import { useQuery } from "react-query";
import { useParams, useSearchParams } from "react-router-dom";
import { StorageResponse } from "types";
import AddAttachment from "./AddAttachment";
import BreadCrumbs from "./BreadCrumbs";
import Files from "./Files";
import Folders from "./Folders";
import FolderIcon from "@mui/icons-material/Folder";
import { useState } from "react";

function Attachments() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const query = {
    clientId: params.clientId || "",
    folderId: searchParams.get("folderId"),
  };
  const { data, isLoading }: StorageResponse = useQuery(
    ["storage", query],
    getStorage
  );

  const folders = data?.data?.result?.filter((item) => item.type === "folder");
  const files = data?.data?.result?.filter((item) => item.type === "file");

  if (isLoading) return <Loader />;

  return (
    <>
      <Box px={4} py={2} display="flex" justifyContent="flex-end">
        <Box position="relative">
          <SearchContainer
            minWidth="350px"
            placeHolder="Search Attachment"
            onChange={(v) => setSearch(v)}
          />
          {search && (
            <Paper
              sx={{
                width: "100%",
                p: 2,
                boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                position: "absolute",
                top: "100%",
                left: 0,
              }}
            >
              <Box
                display="flex"
                gap={1}
                alignItems="center"
                sx={{ cursor: "pointer" }}
              >
                <FolderIcon sx={{ color: "rgba(0,0,0,0.4)" }} />
                <Typography>hello</Typography>
              </Box>
            </Paper>
          )}
        </Box>
      </Box>
      <Box px={4} py={2} width="90%">
        {data?.data.breadCrumbs.length ? (
          <BreadCrumbs data={data?.data?.breadCrumbs} />
        ) : null}
        {folders?.length ? <Folders data={folders} /> : null}
        {files?.length ? <Files data={files} /> : null}
        <AddAttachment />
      </Box>
    </>
  );
}

export default Attachments;
