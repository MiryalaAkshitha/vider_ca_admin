import { Box, Tab, Tabs } from "@mui/material";
import { getForm } from "api/services/forms";
import Loader from "components/Loader";
import useQueryParams from "hooks/useQueryParams";
import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { ResType } from "types";
import KybAppbar from "views/client-view/KybInfo/KybAppbar";
import KybFormFields from "views/client-view/KybInfo/KybFormFields";

function KybFormDetails() {
  const params = useParams();
  const [activePage, setActivePage] = useState(0);
  const { queryParams } = useQueryParams();

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
      <KybAppbar name={queryParams?.formName} page="Form Details" />
      <Box px={3} pb={15} maxWidth={1200}>
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
