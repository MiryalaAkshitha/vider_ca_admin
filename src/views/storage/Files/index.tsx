import { MoreVert } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Table from "components/Table";
import View from "components/View";
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
};

function Files(props: Props) {
  const { data, xl, lg } = props;
  const [contextMenu, setContextMenu] = useState<Position | null>(null);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [view, setView] = useState<ViewType>("grid");

  const handleView = (view: ViewType) => {
    setView(view);
  };

  return (
    <>
      <Box mt={4} mb={3}>
        <Box mb={1} display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle2" sx={{ mb: 2 }} color="primary">
            Files
          </Typography>
          <View value={view} onChange={handleView} />
        </Box>
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
                  return moment.utc(item?.updatedAt).local().format("MM/DD/YYYY, h:mm a");
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
      <FolderMenu contextMenu={contextMenu} setContextMenu={setContextMenu} data={selectedFile} />
    </>
  );
}

export default Files;
