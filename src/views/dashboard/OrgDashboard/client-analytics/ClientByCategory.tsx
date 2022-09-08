import { Box, Typography } from "@mui/material";
import { getClientsByCategory } from "api/services/organization";
import Loader from "components/Loader";
import { useQuery } from "react-query";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ResType } from "types";
import { getTitle } from "utils";
import { StyledTaskBox } from "../styles";

function ClientByCategory() {
  const { data, isLoading }: ResType = useQuery(["clients-by-category"], getClientsByCategory);

  if (isLoading) return <Loader />;

  return (
    <Box>
      <StyledTaskBox>
        <header>
          <Box display="flex" alignItems="center" gap={4}>
            <Typography variant="h6">Client by Category</Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span
                style={{ width: 10, height: 10, background: "#0D47A1", borderRadius: "50%" }}
              ></span>
              <Typography variant="caption">Active Clients</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <span
                style={{ width: 10, height: 10, background: "#64B5F6", borderRadius: "50%" }}
              ></span>
              <Typography variant="caption">Inactive Tasks</Typography>
            </Box>
          </Box>
        </header>
        <main>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={
                data?.data?.map((item: any) => ({
                  category: getTitle(item?.category),
                  Active: item?.activeClients,
                  Inactive: item?.inactiveClients,
                })) || []
              }
              style={{ padding: 0, fontSize: "12px" }}
            >
              <Bar dataKey="Active" barSize={6} radius={[4, 4, 0, 0]} fill="#0D47A1"></Bar>
              <Bar dataKey="Inactive" barSize={6} radius={[4, 4, 0, 0]} fill="#64B5F6"></Bar>
              <XAxis type="category" dataKey="category" />
              <YAxis type="number" domain={[0, "dataMax + 25"]} />
              <Tooltip
                labelStyle={{ color: "#000", fontWeight: "bold", fontSize: 15 }}
                cursor={{ fill: "transparent" }}
              />
            </BarChart>
          </ResponsiveContainer>
        </main>
      </StyledTaskBox>
    </Box>
  );
}

export default ClientByCategory;
