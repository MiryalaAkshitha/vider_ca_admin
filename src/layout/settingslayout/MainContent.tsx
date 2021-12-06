import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";

function MainContent({ children }) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: "250px",
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}

export default MainContent;
