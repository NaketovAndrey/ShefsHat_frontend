import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shadows: ["none"],
  palette: {
    primary: {
      main: "#2B2A28",
    },
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});
