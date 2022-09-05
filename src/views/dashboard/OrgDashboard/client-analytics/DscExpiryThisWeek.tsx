import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, MenuItem, TextField, Typography } from "@mui/material";
import { format } from "date-fns";
import { useState } from "react";
import { StyledTaskBox } from "../styles";
import DueCard from "../task-analytics/DueDatesThisWeek/DueCard";

function DscExpiryThisWeek() {
  const [type, setType] = useState<string>("task");

  return (
    <StyledTaskBox sx={{ position: "absolute", left: 0, right: 0, height: "100%" }}>
      <header>
        <Typography variant="h6">DSC Expiry this week</Typography>
        <TextField
          value={type}
          select
          variant="outlined"
          size="small"
          onChange={(e) => setType(e.target.value)}
        >
          <MenuItem value="task">Task</MenuItem>
          <MenuItem value="event">Event</MenuItem>
        </TextField>
      </header>
      <main>
        {data.map((perDay: any) => {
          return (
            <Box sx={{ display: "flex", gap: "30px", alignItems: "start" }}>
              <Box>
                <Typography variant="h5" color="primary">
                  {format(new Date(perDay.date), "dd")}
                </Typography>
                <Typography variant="caption" color="rgba(0,0,0,0.4)">
                  {format(new Date(perDay.date), "MMM")}
                </Typography>
              </Box>
              <Box flex={1}>
                {perDay.deadLines.map((dealine: any) => {
                  return <DueCard dealine={dealine} />;
                })}
              </Box>
            </Box>
          );
        })}
      </main>
      <footer>
        <Typography variant="body2" color="secondary">
          Due dates this week
        </Typography>
        <IconButton color="secondary" size="small">
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </footer>
    </StyledTaskBox>
  );
}

export default DscExpiryThisWeek;

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
];
