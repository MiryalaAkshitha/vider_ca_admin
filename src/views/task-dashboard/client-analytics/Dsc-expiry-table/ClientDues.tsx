import { Box, Divider, IconButton, Typography } from "@mui/material";
import { borderRadius } from "@mui/system";
import React from "react";
import { Typography13 } from "views/task-dashboard/styles";
import EastIcon from "@mui/icons-material/East";

export default function ClientDues({ dealine }: { dealine: any }) {
  return (
    <Box
      sx={{
        boxShadow: "0px 5px 15px #3A46971A",
        marginBottom: "20px",
        padding: "15px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "start",
        borderRadius: "10px",
      }}
    >
      <Box>
        <Box sx={{ marginBottom: "15px" }}>
          <Typography13>{dealine.code}</Typography13>
          <Typography>{dealine.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", gap: " 15px" }}>
          <Box>
            <Typography13>Client Name</Typography13>
            <Box
              sx={{
                display: "flex",
                gap: "8px",
                marginTop: "8px",
                alignItems: "center",
              }}
            >
              <img
                src={dealine.client.image}
                style={{
                  borderRadius: "50%",
                  height: "30px",
                  width: "30px",
                  objectFit: "cover",
                }}
              ></img>
              <Typography>{dealine.client.name}</Typography>
            </Box>
          </Box>
          <Divider orientation="vertical" flexItem />
          <Box sx={{ height: "30px" }}>
            <Typography13>Members</Typography13>
            <Box
              sx={{
                marginTop: "8px",
                position: "relative",
              }}
            >
              {dealine.members.map((member: any, index: number) => {
                return (
                  <img
                    src={dealine.client.image}
                    style={{
                      borderRadius: "50%",
                      height: "30px",
                      width: "30px",
                      objectFit: "cover",
                      border: "solid 3px white",
                      position: "absolute",
                      left: `${index * 20}px`,
                      zIndex: `${100 - index}`,
                    }}
                  ></img>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "30px",
          alignItems: "end",
        }}
      >
        <Box
          sx={{
            margin: "5px 5px 0 0",
            borderRadius: "20px",
            minWidth: "115px",
            padding: "5px",
            backgroundColor:
              dealine.type == "Income Tax"
                ? "#58094F"
                : dealine.type == "GST"
                ? "#F3AA20"
                : dealine.type == "MCA-Company"
                ? "#346B6D"
                : "",
          }}
        >
          <Typography sx={{ color: "white", textAlign: "center" }}>
            {dealine.type}
          </Typography>
        </Box>
        <IconButton color="secondary">
          <EastIcon />
        </IconButton>
      </Box>
    </Box>
  );
}
