import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";

export const routes = [
  {
    path: "",
    element: (
      <ProtectedRoute>
        <MainPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];
