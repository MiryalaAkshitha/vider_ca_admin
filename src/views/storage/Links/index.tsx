import { MoreVert } from "@mui/icons-material";
import { Grid, IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { icons } from "assets";
import Table from "components/Table";
import moment from "moment";
import { useState } from "react";
import { ViewType } from "types";
import FolderMenu from "../FolderOrFileMenu";
import Link, { Position } from "./Link";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

type Props = {
  data: any;
  xl?: number;
  lg?: number;
  view?: ViewType;
};

function Links(props: Props) {
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
                <Link data={item} />
              </Grid>
            ))}
          </Grid>
        )}
        {view === "list" && (
          <Table
            loading={false}
            columns={[
              {
                title: "File Name",
                key: "name",
                render: (row: any) => {
                  return (
                    <Box
                      display="flex"
                      gap={1}
                      alignItems="center"
                      onClick={() => window.open(row?.file)}
                      sx={{ cursor: "pointer" }}
                    >
                      <div>
                        <img src={icons.onedrive} alt="OneDrive" width="20px" />
                      </div>
                      <Typography variant="body2">{row?.name}</Typography>
                      <OpenInNewIcon color="secondary" fontSize="small" />
                    </Box>
                  );
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

export default Links;
