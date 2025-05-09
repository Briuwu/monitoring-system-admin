import { account } from "@/appwrite";
import fetchAuthUser from "@/lib/get-auth";
import { useEffect } from "react";

import { Outlet, Navigate } from "react-router";

export const ProtectedRoutes = () => {
  let user = JSON.parse(localStorage.getItem("session") || "false");

  useEffect(() => {
    const fetch = async () => {
      try {
        user = await fetchAuthUser(user);
        if (!user) {
          try {
            const session = await account.getSession("current");
            if (session && session.current) {
              user = session.current;
              localStorage.setItem("session", JSON.stringify(user));
            } else {
              localStorage.clear();
              user = false;
            }
          } catch (error) {
            console.error("Session error:", error);
            user = false;
          }
        }
      } catch (error) {
        console.error("Error Getting Authenticated User:", error);
        user = false;
      }
    };

    fetch();
  }, []);

  return user ? <Outlet /> : <Navigate to="/" />;
};
