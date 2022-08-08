import { createTheme, ThemeOptions } from "@mui/material/styles";

export const theme: ThemeOptions = createTheme({
  palette: {
    primary: {
      main: "#182F53",
      light: "rgb(24, 47, 83, 0.1)",
      dark: "rgb(24, 47, 83, 0.8)",
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
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "0px 0px 10px rgba(0,0,0,0.2)",
        },
      },
    },
    MuiSelect: {
      defaultProps: {
        MenuProps: {
          PaperProps: {
            style: {
              maxHeight: 300,
            },
          },
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

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontFamily: "muli_regular",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0px 5px 20px #0000001A",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 5px 20px #0000001A",
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        paper: {
          boxShadow: "0px 5px 20px #0000001A",
          borderRadius: "8px",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontFamily: "muli_regular",
          fontSize: "13px",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          fontFamily: "muli_regular",
        },
        option: {
          fontFamily: "muli_regular",
          fontSize: "14px",
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
          fontSize: "15px",
        },
        subtitle1: {
          fontFamily: "muli_medium",
          fontSize: "20px",
        },
        subtitle2: {
          fontFamily: "muli_medium",
          fontSize: "17px",
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
