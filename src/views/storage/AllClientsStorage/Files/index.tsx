import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Table from "components/Table";
import View from "components/View";
import { useState } from "react";
import { ViewType } from "types";
import File from "./File";
import moment from "moment";
import { getFileSize } from "utils";

type Props = {
  data: any;
};

function Files(props: Props) {
  const { data } = props;

  const [view, setView] = useState<ViewType>("grid");

  const handleView = (view: ViewType) => {
    setView(view);
  };

  return (
    <Box mt={4}>
      <Box
        mb={2}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="subtitle2" color="primary">
          Files
        </Typography>
        <View value={view} onChange={handleView} />
      </Box>
      {view === "grid" && (
        <Grid container spacing={2}>
          {data.map((item: any) => (
            <Grid item xl={3} lg={3} md={4} key={item?.id}>
              <File data={item} />
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
          ]}
          data={data}
        />
      )}
    </Box>
  );
}

export default Files;
