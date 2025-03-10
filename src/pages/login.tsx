import bg from "@/assets/bg.png";
import LoginForm from "@/components/login-form";
import { useEffect } from "react";

function LoginPage() {
  useEffect(() => {
    if (localStorage.getItem("session")) {
      window.location.href = "/dashboard";
    }
  }, []);

  return (
    <main className="grid grid-cols-2 min-h-screen">
      <img src={bg} alt="" className="h-full object-cover" />
      <div className="p-4 grid">
        <h1 className="text-xl font-bold text-center">
          Seiwa Kaiun Philippines Inc.
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
