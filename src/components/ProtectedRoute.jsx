import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const { access_token } = useSelector((state) => state.auth);
  return access_token ? children : <Navigate to="/login" replace />;
}
