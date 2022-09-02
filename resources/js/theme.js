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
