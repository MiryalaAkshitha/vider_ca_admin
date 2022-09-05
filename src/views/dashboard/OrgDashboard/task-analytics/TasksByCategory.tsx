import { Typography } from "@mui/material";
import HorizontalDoubleBars from "../components/HorizontalDoubleBars";
import { StyledTaskBox } from "../styles";

function TasksByCategory() {
  return (
    <StyledTaskBox>
      <header>
        <Typography variant="subtitle2" color="primary">
          Tasks by Category
        </Typography>
      </header>
      <main>
        <HorizontalDoubleBars
          data={[
            {
              name: "CBDT-Income Tax",
              reacurring: 70,
              oneTime: 60,
              color: "#FF3465",
            },
            {
              name: "ICAI UDIN",
              reacurring: 60,
              oneTime: 60,
              color: "#FFCF64",
            },
            { name: "MCA LLP", reacurring: 45, oneTime: 60, color: "#00D9A6" },
            {
              name: "CBIC - GST",
              reacurring: 18,
              oneTime: 60,
              color: "#149ECD",
            },
            {
              name: "ICSI UDIN",
              reacurring: 39,
              oneTime: 60,
              color: "#88B053",
            },
            {
              name: "To do",
              reacurring: 70,
              oneTime: 60,
              color: "#FF3465",
            },
            {
              name: "MCA - Company",
              reacurring: 60,
              oneTime: 60,
              color: "#FFCF64",
            },
            { name: "SBR/SBL", reacurring: 45, oneTime: 60, color: "#00D9A6" },
            { name: "CBR/CBL", reacurring: 18, oneTime: 60, color: "#149ECD" },
            { name: "IP", reacurring: 39, oneTime: 60, color: "#88B053" },
            {
              name: "eICMAI UDIN",
              reacurring: 70,
              oneTime: 60,
              color: "#FF3465",
            },
            {
              name: "CBIC - Customs",
              reacurring: 60,
              oneTime: 60,
              color: "#FFCF64",
            },
            {
              name: "CBIC-Central Excise",
              reacurring: 45,
              oneTime: 60,
              color: "#00D9A6",
            },
            {
              name: "ML&E - EPFO",
              reacurring: 18,
              oneTime: 60,
              color: "#149ECD",
            },
          ]}
        />
      </main>
    </StyledTaskBox>
  );
}

export default TasksByCategory;
