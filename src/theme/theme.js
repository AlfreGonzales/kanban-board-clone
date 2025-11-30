import { createTheme } from "@mui/material";

const theme = (darkMode) => {
  return createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });
};

export default theme;
