import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { StyledNotificationsTabs } from "layout/styles";
import NotificationsDatePicker from "./NotificationsDatePicker";
import { Avatar, Divider } from "@mui/material";

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
      {value === index && (
        <Box>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function NotificationsTabs() {
  const [value, setValue] = useState(0);
  const [category, setCategory] = useState<String | null>("All");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setCategory(event.currentTarget.getAttribute("data-type"));
  };

  function getNotificationsData() {
    if (value === 0) {
      return notificationsData;
    }
    return notificationsData.filter((data) => {
      return data.category === category;
    });
  }

  const notificationsCategory = [
    "All",
    "Task",
    "Client",
    "Event",
    "Invoice",
    "Receivables",
    "Estimates",
    "Members",
    "Reports",
    "Services",
    "Ticket",
  ];
  const notificationsData = [
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Task",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Client",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Event",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Invoice",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Receivables",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Estimates",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Members",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Reports",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Services",
    },
    {
      user: "Marshal",
      title: "GST Returns",
      name: "Preetham",
      dateTime: "12/12/2020, 04:25 PM",
      category: "Ticket",
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          variant="scrollable"
          scrollButtons="auto"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
          sx={{
            backgroundColor: "#f5f5f5",
          }}
        >
          {notificationsCategory.map((category, index) => {
            return (
              <StyledNotificationsTabs
                key={index}
                data-type={category}
                label={category}
              />
            );
          })}
        </Tabs>
      </Box>
      <Box
        sx={{
          padding: "30px 20px",
        }}
      >
        <NotificationsDatePicker />
        {notificationsCategory.map((category, index) => {
          return (
            <TabPanel value={value} index={index} key={index}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "500px",
                  overflowY: "scroll",
                  marginTop: "20px",
                }}
              >
                {getNotificationsData().map((data, index) => {
                  return (
                    <>
                      <Box
                        key={index}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "10px 0",
                          flex: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "flex-start",
                          }}
                        >
                          <Avatar alt="Remy Sharp" />
                          <Typography
                            variant="subtitle1"
                            sx={{
                              fontSize: "14px",
                              margin: "0 10px",
                            }}
                          >
                            {data.user} has added a new task{" "}
                            <span style={{ color: "#3174c4" }}>
                              "{data.category}"
                            </span>{" "}
                            for Client{" "}
                            <span style={{ color: "#3174c4" }}>
                              "{data.name}"
                            </span>
                          </Typography>
                        </Box>
                        <Typography
                          variant="caption"
                          sx={{
                            alignSelf: "flex-end",
                          }}
                        >
                          {data.dateTime}
                        </Typography>
                      </Box>
                      <Divider />
                    </>
                  );
                })}
              </Box>
            </TabPanel>
          );
        })}
      </Box>
    </Box>
  );
}

export default NotificationsTabs;
