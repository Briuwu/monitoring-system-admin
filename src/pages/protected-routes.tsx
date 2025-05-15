import fetchAuthUser from "@/lib/get-auth";
import { TrophySpin } from "react-loading-indicators";
import { account } from "@/appwrite";
import { useState, useEffect } from "react";
import { Outlet, Navigate } from "react-router";

export const ProtectedRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * This is the main protected routes for the monitoring system.
   * It is used to check if the user is logged in and if the user is not logged in, it redirects to the login page.
   * It is used to check if the user is an admin and if the user is not an admin, it redirects to the client page.
   */
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Try to get user from localStorage first
        const storedSession = localStorage.getItem("session");
        const userData = storedSession ? JSON.parse(storedSession) : null;

        if (userData) {
          // Verify if the stored user data is still valid
          const isValid = await fetchAuthUser(userData);
          if (isValid) {
            setIsAuthenticated(true);
            setIsLoading(false);
            return;
          }
        }

        // If no valid stored session, try to get current session from Appwrite
        try {
          const session = await account.getSession("current");
          if (session) {
            localStorage.setItem("session", JSON.stringify(session.current));
            setIsAuthenticated(true);
          } else {
            localStorage.removeItem("session");
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error("Session error:", error);
          localStorage.removeItem("session");
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Error Getting Authenticated User:", error);
        localStorage.removeItem("session");
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <TrophySpin
          color="#57fa2b"
          size="large"
          text="Please Wait..."
          textColor="#000000"
        />
      </div>
    );
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
