import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";

type Props = {
  children: React.ReactNode;
};

function MainContent({ children }: Props) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: "240px",
      }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}

export default MainContent;
