import { account } from "@/appwrite";
import { useEffect } from "react";

import { Outlet, Navigate } from "react-router";

export const ProtectedRoutes = () => {
  const user = localStorage.getItem("session");

  useEffect(() => {
    const fetch = async () => {
      const data = await account.get();
      localStorage.setItem("user-department", JSON.stringify(data.labels[1]));
      localStorage.setItem("name", JSON.stringify(data.name));
    };

    fetch();
  }, []);

  return user ? <Outlet /> : <Navigate to="/" />;
};
