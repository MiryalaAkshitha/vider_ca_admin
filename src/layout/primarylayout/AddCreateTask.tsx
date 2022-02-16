import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { StyledAddCreateTaskTabs, StyledAddCreateTaskTab } from "../styles";

function AddCreateTask({ setOpen }) {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
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

  const tasks = [
    { title: "Task", options: ["Create Task", "Recurring Task"] },
    { title: "Client", options: ["Create Task", "Recurring Task"] },
    { title: "Event", options: ["Create Task", "Recurring Task"] },
    { title: "Invoice", options: ["Create Task", "Recurring Task"] },
    { title: "Team Members", options: ["Create Task", "Recurring Task"] },
    { title: "Group", options: ["Create Task", "Recurring Task"] },
    { title: "Log Hours", options: ["Create Task", "Recurring Task"] },
    { title: "Services", options: ["Create Task", "Recurring Task"] },
    { title: "Raise a Ticket", options: ["Create Task", "Recurring Task"] },
  ];

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "600px",
        }}
      >
        {/* Toolbar heading */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "20px 22px",
          }}
        >
          <Typography variant="h6">Add new</Typography>
          <Typography
            variant="body2"
            sx={{ cursor: "pointer" }}
            onClick={() => setOpen(false)}
          >
            Cancel
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            borderTop: 1,
            borderBottom: 1,
            borderColor: "#00000029",
          }}
        >
          {/* Tabs*/}
          <StyledAddCreateTaskTabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label=""
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {tasks.map((task, index) => {
              return (
                <StyledAddCreateTaskTab
                  key={index}
                  label={task.title}
                  {...a11yProps(index)}
                />
              );
            })}
          </StyledAddCreateTaskTabs>
          {tasks.map((tasks, i) => {
            return (
              <TabPanel key={i} value={value} index={i}>
                <FormControl>
                  <RadioGroup name={tasks.title}>
                    {tasks.options.map((option, index) => {
                      return (
                        <FormControlLabel
                          key={index}
                          value={option}
                          control={
                            <Radio
                              sx={{
                                "&.Mui-checked": {
                                  color: "#F2353C",
                                },
                              }}
                            />
                          }
                          label={`${option} ${i}`}
                        />
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              </TabPanel>
            );
          })}
        </Box>
        {/*  Create Button */}
        <Box
          sx={{ display: "flex", justifyContent: "center", padding: "30px 0" }}
        >
          <Button
            color="secondary"
            variant="contained"
            sx={{ padding: "15px 100px" }}
          >
            <Typography>Create {tasks[value].title}</Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default AddCreateTask;
