import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme } from "@mui/material/styles";

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function Appbar(props) {
  const theme = useTheme();

  const { children, anchors, occupy = false } = props;

  return (
    <>
      <AppBar
        sx={{
          width: {
            sm: occupy ? "100%" : `calc(100% - ${theme.spacing(9)} + 1px)`,
            height: 60,
          },
          ml: { sm: occupy ? 0 : `calc(${theme.spacing(9)} + 1px)` },
        }}
        color="default"
        position="fixed"
      >
        {children}
      </AppBar>
      {anchors}
    </>
  );
}

export default Appbar;
