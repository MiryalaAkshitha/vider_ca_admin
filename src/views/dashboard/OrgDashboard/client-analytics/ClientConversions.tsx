import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Box, IconButton, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { StyledTaskBox } from "../styles";
import { Cell, Pie, PieChart, Tooltip } from "recharts";

function ClientConversions({ data }) {
  const navigate = useNavigate();

  const finalResult = [
    {
      name: "Converted Leads",
      number: data?.convertedLeads,
      value: data?.convertedLeadsPercent,
      fill: "#0D47A1",
    },
    {
      name: "Not converted Leads",
      number: data?.notConvertedLeads,
      value: data?.notConvertedLeadsPercent,
      fill: "#64B5F6",
    },
  ];

  const handleClick = (v: any) => {
    // if (v?.name === "Clients") {
    //   navigate("/clients");
    // }
    // if (v?.name === "Leads") {
    //   navigate("/leads");
    // }
  };

  return (
    <StyledTaskBox>
      <header>
        <Typography variant="h6">Client Conversions</Typography>
      </header>
      <main>
        <Box sx={{ width: "100%", display: "flex", gap: "20px" }}>
          <PieChart width={200} height={200}>
            <Pie
              data={finalResult}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              style={{ cursor: "pointer" }}
            >
              {finalResult?.map((entry, index) => (
                <Cell onClick={() => handleClick(entry)} key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                return (
                  <Box
                    sx={{
                      background: "white",
                      padding: "10px",
                      borderRadius: "5px",
                      boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.2)",
                    }}
                  >
                    <Typography variant="h6">{payload?.[0]?.payload?.payload?.name}</Typography>
                    <Typography variant="body2">
                      {payload?.[0]?.payload?.payload?.number}
                    </Typography>
                  </Box>
                );
              }}
              labelStyle={{ color: "#000", fontWeight: "bold", fontSize: 13 }}
              cursor={{ fill: "transparent" }}
            />
          </PieChart>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              justifyContent: "center",
            }}
          >
            <Box>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Box
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    backgroundColor: "#0D47A1",
                  }}
                ></Box>
                <Typography variant="caption">Converted Leads</Typography>
              </Box>
              <Typography variant="h5">
                {data?.convertedLeads} ({data?.convertedLeadsPercent}%)
              </Typography>
            </Box>
            <Box>
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Box
                  sx={{
                    width: "11px",
                    height: "11px",
                    borderRadius: "50%",
                    backgroundColor: "#64B5F6",
                  }}
                ></Box>
                <Typography variant="caption">Not Converted Leads</Typography>
              </Box>
              <Typography variant="h5">
                {data?.notConvertedLeads} ({data?.notConvertedLeadsPercent}%)
              </Typography>
            </Box>
          </Box>
        </Box>
      </main>
      <footer>
        <Typography variant="body2" color="secondary">
          View Leads
        </Typography>
        <IconButton color="secondary" size="small" onClick={() => navigate("/leads")}>
          <ArrowForwardIcon fontSize="small" />
        </IconButton>
      </footer>
    </StyledTaskBox>
  );
}

export default ClientConversions;
