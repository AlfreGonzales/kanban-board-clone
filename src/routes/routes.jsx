import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";

export const routes = [
  {
    path: "",
    element: <MainPage />,
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];
