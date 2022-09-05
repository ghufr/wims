import { createTheme } from "@mui/material/styles";

export default createTheme({
  transitions: {
    create: () => "none",
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true, // No more ripple
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        "*, *::before, *::after": {
          transition: "none !important",
          animation: "none !important",
        },
      },
    },
  },
  palette: {
    type: "light",
    primary: {
      main: "#222222",
    },
    secondary: {
      main: "#ff6e40",
    },
  },
});
