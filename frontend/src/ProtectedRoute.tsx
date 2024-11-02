import { Navigate } from "react-router-dom";
import useAppContext from "./hooks/useAppContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoadingUser } = useAppContext();

  if (isLoadingUser) return <div>Loading...</div>;

  return user ? children : <Navigate to="/" />;
}

export default ProtectedRoute;
