import { useRoutes } from "react-router-dom";
import { routes } from "./routes/routes";

function App() {
  const routesManagment = useRoutes(routes);
  return routesManagment;
}

export default App;
