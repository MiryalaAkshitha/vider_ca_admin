import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import { Collapse, Divider, ListItemIcon, ListItemText, Tabs, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ComingSoon from "components/ComingSoon";

import useTitle from "hooks/useTitle";
import { StyledListItemButton, StyledTab } from "../styles";
import React, { useState } from "react";

function InvoiceDashboardMenu0() {
  useTitle("Invoice");

  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const dashboardItems = [
    {
      title: "Dashboard",
      icon: <GridViewOutlined />,
    },
    {
      title: "Tasks",
      icon: <FormatListBulletedOutlinedIcon />,
      dropDown: ["Unbilled Tasks", "Billed Tasks"],
      dropDownOption: true,
    },
    {
      title: "Clients",
      icon: <PersonOutlineOutlinedIcon />,
    },
    {
      title: "Invoices & Receipts",
      icon: <ReceiptLongOutlinedIcon />,
    },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            maxWidth: "240px",
            width: "100%",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="Invoice Dashboard Tabs"
            orientation="vertical"
            sx={{
              border: "1px solid lightgray",
              height: "100%",
            }}
          >
            {dashboardItems.map((data, index) => {
              return (
                <Box key={index}>
                  <StyledTab
                    onClick={data.dropDownOption ? handleClick : undefined}
                    {...a11yProps(index)}
                    label={
                      <React.Fragment>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: "auto", mr: 2 }}>{data.icon}</ListItemIcon>
                          <ListItemText primary={data.title} />
                          {data.dropDownOption ? (
                            open ? (
                              <ArrowDropDownIcon sx={{ marginLeft: "auto" }} />
                            ) : (
                              <ArrowRightIcon sx={{ marginLeft: "auto" }} />
                            )
                          ) : null}
                        </Box>
                      </React.Fragment>
                    }
                  />
                  {data.dropDown && data.dropDownOption ? (
                    <Collapse in={open} timeout="auto" unmountOnExit>
                      {data.dropDown.map((data, index) => {
                        return (
                          <React.Fragment key={index}>
                            <StyledListItemButton sx={{ pl: 7 }}>
                              <Typography>{data}</Typography>
                            </StyledListItemButton>
                          </React.Fragment>
                        );
                      })}
                    </Collapse>
                  ) : data.dropDown ? (
                    <>
                      {data.dropDown.map((data, index) => {
                        return (
                          <React.Fragment key={index}>
                            <StyledListItemButton sx={{ pl: 7 }}>
                              <Typography>{data}</Typography>
                            </StyledListItemButton>
                          </React.Fragment>
                        );
                      })}
                    </>
                  ) : null}
                  <Divider />
                </Box>
              );
            })}
          </Tabs>
        </Box>

        <Box
          sx={{
            flex: 1,
          }}
        >
          <TabPanel value={value} index={0}>
            <ComingSoon title="Invoicing Dashboard" />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ComingSoon title="Invoicing Tasks" />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <ComingSoon title="Invoicing Clients" />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <ComingSoon title="Invoices & Receipts" />
          </TabPanel>
        </Box>
      </Box>
    </>
  );
}

export default InvoiceDashboardMenu0;
