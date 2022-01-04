import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { getDDForms } from "api/services/tasks";
import Loader from "components/Loader";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import AddPage from "./AddPage";

function Forms() {
  const params = useParams();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading }: ResType = useQuery(
    ["dd-forms", params.taskId],
    getDDForms
  );

  const handleChange = (_, newValue: number) => {
    setValue(newValue);
  };

  const onDragEnd = async (result: any) => {
    console.log(result);
  };

  if (isLoading) return <Loader />;

  return (
    <>
      {data?.data?.length > 0 ? (
        <>
          <Box textAlign="right">
            <Button
              onClick={() => setOpen(true)}
              startIcon={<Add />}
              color="secondary"
            >
              Add Page
            </Button>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {data?.data?.map((item: any, index: number) => (
                <Tab label={item?.name} {...a11yProps(index)} key={item?.id} />
              ))}
            </Tabs>
          </Box>
          <Box p={2}></Box>
        </>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          minHeight="60vh"
          alignItems="center"
        >
          <Box textAlign="center">
            <Typography gutterBottom variant="subtitle2">
              There are no pages available
            </Typography>
            <Typography mb={3} gutterBottom variant="body1">
              Click on add new page to add a page.
            </Typography>
            <Button
              onClick={() => setOpen(true)}
              variant="contained"
              color="secondary"
            >
              Add New Page
            </Button>
          </Box>
        </Box>
      )}
      <AddPage open={open} setOpen={setOpen} />
    </>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Forms;
