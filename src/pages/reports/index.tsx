import { ArrowForward } from "@mui/icons-material";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { reportsList } from "data/reports";
import useTitle from "hooks/useTitle";
import { Link } from "react-router-dom";

function Reports() {
  useTitle("Reports");

  return (
    <Box p={2}>
      <Grid container spacing={2}>
        {reportsList.map(({ title, path, desc, icon }, index) => (
          <Grid item lg={4} key={index}>
            <Paper>
              <Box sx={{ p: 2 }}>
                <img src={icon} alt={title} style={{ width: "40px" }} />
                <Typography mt={1} gutterBottom variant="subtitle2">
                  {title}
                </Typography>
                <Typography variant="caption">{desc}</Typography>
              </Box>
              <Box
                sx={{
                  px: 2,
                  py: 1,
                  borderTop: "1px solid lightgrey",
                  textAlign: "right",
                }}
              >
                <Link to={path} style={{ textDecoration: "none" }}>
                  <Button color="secondary" endIcon={<ArrowForward />}>
                    Generate Report
                  </Button>
                </Link>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default Reports;
