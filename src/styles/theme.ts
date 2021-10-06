import { createTheme, ThemeOptions } from "@mui/material";

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#182F53",
      light: "rgb(70, 88, 117)",
      dark: "rgb(16, 32, 58)",
    },
    secondary: {
      main: "#E44652",
      light: "rgb(233, 107, 116)",
      dark: "rgb(159, 49, 57)",
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
          minWidth: 100,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          fontFamily: "muli_regular",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        outlined: {
          fontFamily: "muli_regular",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        formControl: {
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
          fontSize: "20px",
        },
        subtitle2: {
          fontFamily: "muli_medium",
          fontSize: "18px",
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
