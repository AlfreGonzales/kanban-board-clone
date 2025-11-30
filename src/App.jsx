import { BrowserRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme/theme";
import { useSelector } from "react-redux";

function RoutesComponent() {
  const routesManagment = useRoutes(routes);
  return routesManagment;
}

function App() {
  const { darkMode } = useSelector((state) => state.tasks);
  const newTheme = theme(darkMode);

  return (
    <ThemeProvider theme={newTheme}>
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
