import { Add, PlayArrow } from "@mui/icons-material";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddPage from "./AddPage";

type Props = {
  data: any;
  value: number;
  setValue: (value: number) => void;
};

function Forms({ data, value, setValue }: Props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (_, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      {data.length > 0 ? (
        <>
          <Box textAlign="right">
            <Button
              onClick={() => setOpen(true)}
              startIcon={<Add />}
              color="secondary"
            >
              Add Page
            </Button>
            <Button
              onClick={() => {
                navigate(`/due-diligence/${data[0]?.task?.uid}`);
                console.log(data);
              }}
              sx={{ ml: 1 }}
              startIcon={<PlayArrow />}
              color="secondary"
            >
              Preview
            </Button>
          </Box>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              {data?.map((item: any, index: number) => (
                <Tab label={item?.name} {...a11yProps(index)} key={item?.id} />
              ))}
            </Tabs>
          </Box>
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
