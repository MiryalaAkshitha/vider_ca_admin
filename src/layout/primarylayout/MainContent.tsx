import { Toolbar } from "@mui/material";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

function MainContent(props: any) {
  const theme = useTheme();
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        ml: { sm: `calc(${theme.spacing(9)} + 1px)` },
      }}
    >
      <Toolbar />
      {props.children}
    </Box>
  );
}

export default MainContent;
