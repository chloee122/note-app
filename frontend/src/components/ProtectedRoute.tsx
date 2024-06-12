import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAppContext();
  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;
