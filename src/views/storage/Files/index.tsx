import { MoreVert } from "@mui/icons-material";
import { Grid, IconButton } from "@mui/material";
import { Box } from "@mui/system";
import Table from "components/Table";
import moment from "moment";
import { useState } from "react";
import { ViewType } from "types";
import { getFileSize } from "utils";
import FolderMenu from "../FolderOrFileMenu";
import File, { Position } from "./File";

type Props = {
  data: any;
  xl?: number;
  lg?: number;
  view?: ViewType;
};

function Files(props: Props) {
  const { data, xl, lg, view = "grid" } = props;
  const [contextMenu, setContextMenu] = useState<Position | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);

  return (
    <>
      <Box>
        {view === "grid" && (
          <Grid container spacing={2}>
            {data?.map((item: any) => (
              <Grid item xl={xl ?? 3} lg={lg ?? 3} key={item?.id}>
                <File data={item} />
              </Grid>
            ))}
          </Grid>
        )}
        {view === "list" && (
          <Table
            loading={false}
            onRowClick={(row: any) => {
              window.open(row?.fileUrl);
            }}
            columns={[
              {
                title: "File Name",
                key: "name",
              },
              {
                title: "Size",
                key: "fileSize",
                render: (item: any) => {
                  return getFileSize(item?.fileSize) || "";
                },
              },
              {
                title: "Last Modified",
                key: "updatedAt",
                render: (item: any) => {
                  return moment
                    .utc(item?.updatedAt)
                    .local()
                    .format("MM/DD/YYYY, h:mm a");
                },
              },
              {
                title: "Actions",
                key: "",
                render: (item: any) => {
                  return (
                    <IconButton
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedFile(item);
                        setContextMenu(
                          contextMenu === null
                            ? {
                                mouseX: e.clientX - 2,
                                mouseY: e.clientY - 4,
                              }
                            : null
                        );
                      }}
                    >
                      <MoreVert />
                    </IconButton>
                  );
                },
              },
            ]}
            data={data || []}
          />
        )}
      </Box>
      <FolderMenu
        contextMenu={contextMenu}
        setContextMenu={setContextMenu}
        data={selectedFile}
      />
    </>
  );
}

export default Files;
