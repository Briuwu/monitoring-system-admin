import { Outlet, Navigate } from "react-router";

export const ProtectedRoutes = () => {
  const user = localStorage.getItem("session");

  return user ? <Outlet /> : <Navigate to="/" />;
};
