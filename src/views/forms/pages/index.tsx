import { Add, PlayArrow } from "@mui/icons-material";
import { Box, Button, Tab, Tabs } from "@mui/material";
import PageFieldItem from "./PageFieldItem";

function Pages({ data, setPageOpen, value, setValue }: any) {
  return (
    <Box
      sx={{
        border: "1px solid #22222226",
        borderRadius: "10px",
        mr: 10,
      }}
    >
      <Box textAlign="right" pt={2} pr={1}>
        <Button
          onClick={() => setPageOpen(true)}
          startIcon={<Add />}
          color="secondary"
        >
          Add Page
        </Button>
        <a
          rel="noopener noreferrer"
          href={`/forms/${data._id}/?preview=true`}
          style={{ textDecoration: "none" }}
          target="_blank"
        >
          <Button sx={{ ml: 1 }} startIcon={<PlayArrow />} color="secondary">
            Preview
          </Button>
        </a>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={(e, val) => setValue(val)}
          aria-label="basic tabs example"
        >
          {data?.pages?.map((item: any, index: number) => (
            <Tab label={item?.name} {...a11yProps(index)} key={item?.id} />
          ))}
        </Tabs>
      </Box>
      <Box>
        <Box
          sx={{
            "& > div:last-child": {
              borderBottom: "1px solid transparent",
            },
          }}
        >
          {data?.pages[value]?.fields?.map((item: any, index: number) => (
            <PageFieldItem page={data} item={item} key={index} index={index} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default Pages;
