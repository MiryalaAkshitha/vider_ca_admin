import { ArrowBack } from "@mui/icons-material";
import { AppBar, Box, Button, Tab, Tabs } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import { getForm } from "api/services/forms";
import Loader from "components/Loader";
import { useState } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ResType } from "types";
import KybFormFields from "views/clients/clients/KybInfo/KybFormFields";

function KybFormDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState(0);

  const { data, isLoading }: ResType = useQuery(
    ["form-details", params.formId],
    getForm
  );

  const handleNext = () => {
    if (activePage === data?.data?.pages?.length - 1) {
      return;
    }
    setActivePage(activePage + 1);
  };

  if (isLoading) return <Loader />;

  return (
    <Box pt={10}>
      <AppBar color="default" position="fixed">
        <Toolbar>
          <Button
            onClick={() => navigate(`/clients/${params?.clientId}/kyb-info`)}
            startIcon={<ArrowBack />}
          >
            Kyb Info
          </Button>
        </Toolbar>
      </AppBar>
      <Box px={3} pb={15}>
        <Tabs
          value={activePage}
          onChange={(e, val) => setActivePage(val)}
          aria-label="basic tabs example"
        >
          {data?.data?.pages?.map((item: any, index: number) => (
            <Tab label={item?.name} {...a11yProps(index)} key={item?._id} />
          ))}
        </Tabs>
        {data?.data?.pages?.map((item: any, index: number) => {
          if (activePage !== index) return null;
          return (
            <KybFormFields
              key={item?._id}
              data={item?.fields}
              pageId={item?._id}
              onContinue={handleNext}
            />
          );
        })}
      </Box>
    </Box>
  );
}

function a11yProps(index: number) {
  return {
    id: `kyb-form-tab-${index}`,
    "aria-controls": `kyb-form-tabpanel-${index}`,
  };
}

export default KybFormDetails;
