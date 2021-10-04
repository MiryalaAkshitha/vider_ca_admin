import { createTheme, ThemeOptions } from "@mui/material";

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#182F53",
      light: "rgb(70, 88, 117)",
      dark: "rgb(16, 32, 58)",
    },
    secondary: {
      main: "#F2353C",
      light: "rgb(244, 93, 99)",
      dark: "rgb(169, 37, 42)",
    },
    background: {
      default: "#ffffff",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
          fontFamily: "muli_regular",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: "muli_regular",
        },
        h1: {
          fontFamily: "muli_bold",
        },
        h2: {
          fontFamily: "muli_bold",
        },
        h3: {
          fontFamily: "muli_bold",
        },
        h4: {
          fontFamily: "muli_bold",
        },
        h5: {
          fontFamily: "muli_bold",
        },
        h6: {
          fontFamily: "muli_bold",
        },
        subtitle1: {
          fontFamily: "muli_medium",
        },
        subtitle2: {
          fontFamily: "muli_medium",
        },
        body1: {
          fontFamily: "muli_regular",
        },
        body2: {
          fontFamily: "muli_regular",
        },
      },
    },
  },
});
