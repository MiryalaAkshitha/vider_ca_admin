import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import TaskBox from "components/task-dashboard/TaskBox";
import React, { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Filters from "./Filters";
import { format } from "date-fns";
import { Typography13 } from "views/task-dashboard/styles";
import Dues from "./Dues";

const TYPES = [
  { name: "Income Tax", color: "#58094F" },
  { name: "GST", color: "#F3AA20" },
  { name: "MCA-Company", color: "#346B6D" },
];
const data = [
  {
    date: "2022-08-1",
    deadLines: [
      {
        code: "VD0001",
        name: "Income Tax Registration",
        type: "Income Tax",
        client: {
          name: "client",
          image: "/profilePicture.png",
        },
        members: [
          {
            name: "person1",
            image: "/profilePicture.png",
          },
          {
            name: "person2",
            image: "/profilePicture.png",
          },
          {
            name: "person3",
            image: "/profilePicture.png",
          },
        ],
      },
      {
        code: "VD0002",
        name: "GST Registration",
        type: "GST",
        client: {
          name: "client",
          image: "/profilePicture.png",
        },
        members: [
          {
            name: "person1",
            image: "/profilePicture.png",
          },
          {
            name: "person2",
            image: "/profilePicture.png",
          },
          {
            name: "person3",
            image: "/profilePicture.png",
          },
        ],
      },
    ],
  },
  {
    date: "2022-08-2",
    deadLines: [
      {
        code: "VD0003",
        name: "MCA-Company",
        type: "MCA-Company",
        client: {
          name: "client",
          image: "/profilePicture.png",
        },
        members: [
          {
            name: "person1",
            image: "/profilePicture.png",
          },
          {
            name: "person2",
            image: "/profilePicture.png",
          },
          {
            name: "person3",
            image: "/profilePicture.png",
          },
        ],
      },
    ],
  },
];

export default function DueDatesThisWeek() {
  const [type, setType] = useState<null | string>(null);
  const footer = () => {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" sx={{ color: "#D31701" }}>
          View Tasks
        </Typography>
        <IconButton sx={{ color: "#D31701" }}>
          <ArrowForwardIcon />
        </IconButton>
      </Box>
    );
  };

  const filter = () => {
    return (
      <FormControl sx={{ width: "195px" }}>
        <InputLabel id="demo-simple-select-label">
          Select Due Date Type
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          label="Select Due Date Type"
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          {TYPES.map((type: any) => {
            return <MenuItem value={type.name}>{type.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  };

  return (
    <TaskBox
      title={"Due dates this week"}
      filter={<>{filter()}</>}
      footer={<>{footer()}</>}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
        }}
      >
        <Filters />
        <Box>
          {data.map((perDay: any) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  gap: "30px",
                  alignItems: "start",
                }}
              >
                <Box>
                  <Typography variant="h5">
                    {format(new Date(perDay.date), "dd")}
                  </Typography>
                  <Typography13>
                    {format(new Date(perDay.date), "MMM")}
                  </Typography13>
                </Box>
                <Box sx={{ width: "100%" }}>
                  {perDay.deadLines.map((dealine: any) => {
                    return <Dues dealine={dealine} />;
                  })}
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>
    </TaskBox>
  );
}
