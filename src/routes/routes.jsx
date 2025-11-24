import LoginPage from "../components/LoginPage";
import MainPage from "../components/MainPage";

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
