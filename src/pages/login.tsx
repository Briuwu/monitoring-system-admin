import { account } from "@/appwrite";
import bg from "@/assets/bg.png";
import LoginForm from "@/components/login-form";
import fetchAuthUser from "@/lib/get-auth";
import { useEffect } from "react";

function LoginPage() {
  let user = JSON.parse(localStorage.getItem("session") || "false");

  /**
   * This is the main login page for the monitoring system.
   * It is used to login the user and redirect to the dashboard.
   * It is used to check if the user is logged in and if the user is not logged in, it redirects to the login page.
   * It is used to check if the user is an admin and if the user is not an admin, it redirects to the client page.
   */
  useEffect(() => {
    const getAuth = async () => {
      user = await fetchAuthUser(user);

      if (!user) {
        try {
          const session = await account.getSession("current");
          if (session && session.current) {
            user = session.current;
            localStorage.setItem("session", JSON.stringify(user));
            window.location.href = "/dashboard";
          }
        } catch (error) {
          console.error("Session error:", error);
          user = false;
        }
      } else {
        window.location.href = "/dashboard";
      }
    };
    getAuth();
  }, []);

  return (
    <main className="grid grid-cols-2 min-h-screen">
      <img src={bg} alt="" className="h-full object-cover" />
      <div className="p-4 grid">
        <h1 className="text-xl font-bold text-center">
          Seiwa Kaiun Philippines, Inc.
        </h1>
        <div>
          <p className="text-center uppercase">Monitoring System Login</p>
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
export default LoginPage;
