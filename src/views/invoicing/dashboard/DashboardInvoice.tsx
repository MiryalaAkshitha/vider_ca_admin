import React, { useState } from "react";

import GridViewOutlined from "@mui/icons-material/GridViewOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import { Tab, Tabs } from "@mui/material";

import { Box } from "@mui/system";

import useTitle from "hooks/useTitle";

import DashboardMenuItem from "./DashboardMenuItem";
import BillingTable from "../billing/BillingTable";

function DashboardInvoice() {
  useTitle("Invoice");

  interface TabPanelProps {
    children?: React.ReactNode;
    index: string;
    value: string;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }

  const [value, setValue] = useState("Dashboard");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const dashboardMenuItems = [
    {
      title: "Dashboard",
      icon: <GridViewOutlined />,
      content: <BillingTable />,
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
      title: "Billing",
      icon: <ReceiptLongOutlinedIcon />,
      dropDown: [
        "Invoices",
        "Receipts",
        "Estimates",
        "Debit notes",
        "Credit notes",
        "Overdue Invoices",
        "Cancelled",
        "Recurring invoices",
      ],
      dropDownOption: true,
    },
    {
      title: "Billing Entities",
      icon: <AccountBalanceWalletOutlinedIcon />,
      dropDown: ["Sai veer", "Venkat"],
      dropDownOption: true,
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
            {dashboardMenuItems.map((data, index) => {
              return (
                <Tab
                  key={index}
                  value={value}
                  component={() => (
                    <DashboardMenuItem
                      setValue={setValue}
                      title={data.title}
                      icon={data.icon}
                      dropDownOption={data.dropDownOption}
                      dropDown={data.dropDown}
                    />
                  )}
                />
              );
            })}
          </Tabs>
        </Box>

        <Box
          sx={{
            flex: 1,
          }}
        >
          {dashboardMenuItems.map((data, index) => {
            return !data.dropDownOption ? (
              <TabPanel key={index} value={value} index={data.title}>
                {data.content ? data.content : data.title}
              </TabPanel>
            ) : (
              data.dropDown.map((title, index) => {
                return (
                  <TabPanel key={index} value={value} index={title}>
                    {title}
                  </TabPanel>
                );
              })
            );
          })}

          {/* <TabPanel value={value} index={"Unbilled Tasks"}>
            testing 2
          </TabPanel>
          <TabPanel value={value} index={"Billed Tasks"}>
            testing 3
          </TabPanel> */}
          {/* <TabPanel value={value} index={3}>
            testing 4
          </TabPanel>
          <TabPanel value={value} index={4}>
            testing 5
          </TabPanel> */}
        </Box>
      </Box>
    </>
  );
}

export default DashboardInvoice;
