import Layout from "../components/layout/Layout";
import ProtectedRoute from "../components/ProtectedRoute";
import LoginPage from "../pages/LoginPage";
import MainPage from "../pages/MainPage";

export const routes = [
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: "login",
    element: <LoginPage />,
  },
];
