import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../firebase/Auth";

// eslint-disable-next-line react/prop-types
export const PrivateRoutes = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to={"/login"} />;
};
