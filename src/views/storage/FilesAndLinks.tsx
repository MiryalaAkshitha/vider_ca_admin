import { Box } from "@mui/system";
import View from "components/View";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { ViewType } from "types";
import Files from "views/storage/Files";
import { getFilesOrFolders } from "views/storage/getFilesOrFolders";
import { StyledClientFilterItem } from "views/tasks/Filters/styles";
import Links from "./Links";

function FilesAndLinks({ data }: any) {
  const { queryParams, setQueryParams } = useQueryParams();
  const [view, setView] = useState<ViewType>("grid");

  const active = queryParams.tab || "files";

  const handleView = (view: ViewType) => {
    setView(view);
  };

  let files = getFilesOrFolders({
    type: "file",
    data: data?.data?.result,
    sortBy: queryParams.soryBy || "",
  });

  let links = getFilesOrFolders({
    type: "link",
    data: data?.data?.result,
    sortBy: queryParams.soryBy || "",
  });

  return (
    <>
      <Box
        mt={4}
        mb={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={2}>
          <StyledClientFilterItem
            sx={{
              "&:before": {
                width: "80%",
                height: "2px",
                bottom: -5,
              },
            }}
            color="primary"
            variant="subtitle2"
            active={active === "files" ? 1 : 0}
            onClick={() => setQueryParams({ ...queryParams, tab: "files" })}
          >
            Files
          </StyledClientFilterItem>
          <StyledClientFilterItem
            sx={{
              "&:before": {
                width: "80%",
                height: "2px",
                bottom: -5,
              },
            }}
            color="primary"
            variant="subtitle2"
            active={active === "links" ? 1 : 0}
            onClick={() => setQueryParams({ ...queryParams, tab: "links" })}
          >
            Links
          </StyledClientFilterItem>
        </Box>
        <View value={view} onChange={handleView} />
      </Box>
      {active === "files" && files?.length ? (
        <Files data={files} view={view} />
      ) : null}
      {active === "links" && links?.length ? (
        <Links data={links} view={view} />
      ) : null}
    </>
  );
}

export default FilesAndLinks;
