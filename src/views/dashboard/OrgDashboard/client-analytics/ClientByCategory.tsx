import { Box, Typography } from "@mui/material";
import HorizontalDoubleBars from "../components/HorizontalDoubleBars";
import { StyledTaskBox } from "../styles";

function ClientByCategory() {
  return (
    <Box>
      <StyledTaskBox>
        <header>
          <Typography variant="h6">Client by Category</Typography>
        </header>
        <main>
          <HorizontalDoubleBars
            data={[
              {
                name: "Individual",
                reacurring: 70,
                oneTime: 60,
                color: "#FF3465",
              },
              {
                name: "HUF",
                reacurring: 60,
                oneTime: 60,
                color: "#FFCF64",
              },
              {
                name: "Patnership Firm",
                reacurring: 45,
                oneTime: 60,
                color: "#00D9A6",
              },
              {
                name: "LLP",
                reacurring: 18,
                oneTime: 60,
                color: "#149ECD",
              },
              {
                name: "Company",
                reacurring: 39,
                oneTime: 60,
                color: "#88B053",
              },
              {
                name: "Trust",
                reacurring: 70,
                oneTime: 60,
                color: "#FF3465",
              },
              {
                name: "Society",
                reacurring: 60,
                oneTime: 60,
                color: "#FFCF64",
              },
              { name: "AOP", reacurring: 45, oneTime: 60, color: "#00D9A6" },
            ]}
          />
        </main>
      </StyledTaskBox>
    </Box>
  );
}

export default ClientByCategory;
